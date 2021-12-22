import { Injectable } from '@angular/core';
import { CartItemDetails } from '../models/CartItemDetails';
import { Product } from '../models/Product';
import { CartService } from './cart.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  public cartProducts: CartItemDetails[] = [];
  public finalPrice: number;
  public receiptFileContent: [];
  public products: Product[] = [];

  constructor(public cartService: CartService, public productService: ProductService) { }

  public getCartProducts() {
    const observable = this.cartService.getAllCartItems();
    observable.subscribe(cartProducts => {
      this.cartProducts = cartProducts;
      this.receiptFileContent = cartProducts;
      this.finalPrice = this.getSum();      
    }, serverErrorResponse => {
      alert("Error 6!" + serverErrorResponse);
    });
  };

  getSum(): number {
    let sum = 0;
    for (let i = 0; i < this.cartProducts.length; i++) {
      sum += this.cartProducts[i].amount * this.cartProducts[i].price;
    }
    let roundedString = sum.toFixed(2);
    let rounded = Number(roundedString);
    return rounded;
  };

  public getCurrentCategoryProducts(categoryId: any): void {
    this.products = [];
    const observable = this.productService.getProductsByCategory(categoryId);

    observable.subscribe(currentProducts => {
      this.products = currentProducts;
    }, serverErrorResponse => {
      alert("Error 6!" + serverErrorResponse);
    });
  }
}
