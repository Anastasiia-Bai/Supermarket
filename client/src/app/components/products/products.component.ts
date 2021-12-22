import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/Cart';
import { CartItemDetails } from 'src/app/models/CartItemDetails';
import { Categories } from 'src/app/models/Categories';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  public categories: Categories[] = [];
  public url: string = "http://localhost:3001/images/";
  public id: number;
  public isAdmin: boolean = false;
  public cart: CartModel;

  constructor(private productService: ProductService, private shoppingCartsService: CartService, 
              private usersService: UsersService, public shareDataService: ShareDataService,
              public adminService: AdminService) { }

  ngOnInit(): void {
    let userType = this.usersService.getLoginToken("role");
    if(userType === 'ADMIN') {
      this.isAdmin = true;
    }

    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;

      this.shareDataService.getCurrentCategoryProducts(this.categories[0].categoryId);
    });
  }

  public onAddToCartClicked(index: number) {
    let cartCopy = [...this.shareDataService.products];
    let productId = cartCopy[index].productId;
    let price = cartCopy[index].price;
    let amount = cartCopy[index].amount;
    let cartId = parseInt(sessionStorage.getItem("cartId"), 10);
    let productName = cartCopy[index].productName;
    let generalPrice = (amount * price);

    console.log(productId);
    
    if(!amount) {
      amount = 1;
    }

    let itemDetails: CartItemDetails = new CartItemDetails(productId, cartId, amount, productName, generalPrice);
    
    const observable = this.shoppingCartsService.addCartItem(itemDetails);
     
    observable.subscribe(successfullServerRequestData => {
      this.shareDataService.getCartProducts();
      console.log(successfullServerRequestData, ' Product was added succesfully');
    }, serverErrorResponse => {
      alert("Error 1!" + serverErrorResponse);
    });
  }

  public onEditProductClicked(index: number) {
    this.adminService.productId = this.shareDataService.products[index].productId;
    this.adminService.productName = this.shareDataService.products[index].productName;
    this.adminService.price = this.shareDataService.products[index].price;
    this.adminService.onEditProductClicked = true;
    this.adminService.addProductForm = false;
  }

  addAmountToProduct(index: number) {
    let productsCopy = [...this.shareDataService.products];
    if (!productsCopy[index].amount) {
      productsCopy[index].amount = 1;
    }
    if (productsCopy[index].amount < 10) {
      productsCopy[index].amount = productsCopy[index].amount + 1;
      this.shareDataService.products = productsCopy;
    }
  }

  reduceAmountFromProduct(index: number) {
    let productsCopy = [...this.shareDataService.products];
    if (!productsCopy[index].amount) {
      productsCopy[index].amount = 1;
    }
    if (productsCopy[index].amount > 1) {
      productsCopy[index].amount = productsCopy[index].amount - 1;
      this.shareDataService.products = productsCopy
    }
  }
}