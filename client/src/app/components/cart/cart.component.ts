import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetails } from 'src/app/models/CartItemDetails';
import { CartService } from 'src/app/services/cart.service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public url: string = "http://localhost:3001/images/";
  public cartId = parseInt(sessionStorage.getItem('cartId'), 10);

  constructor(public cartService: CartService, public router: Router, public shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.shareDataService.getCartProducts();
  }

  public onDeleteCartProductClicked(productId: number) {
    const observable2 = this.cartService.deleteCartProduct(this.cartId, productId);
    observable2.subscribe(deleteProduct => {
      console.log('The product ' + deleteProduct + " was deleted successfully");
      this.shareDataService.getCartProducts();
    })
  };

  public onOrderClicked() {
    this.router.navigate(["/order"]);
  }

  addAmountToProduct(index: number) {
    let cartCopy = [...this.shareDataService.cartProducts];
    if (cartCopy[index].amount < 10) {      
      cartCopy[index].amount = cartCopy[index].amount + 1;
      let productId = cartCopy[index].productId;
      let amount = cartCopy[index].amount;
      let productName = cartCopy[index].productName;
      let price = cartCopy[index].price;
      let generalPrice = (amount * price);
      let cartId = parseInt(sessionStorage.getItem("cartId"), 10);
      let itemDetails: CartItemDetails = new CartItemDetails(productId, cartId, amount, productName, generalPrice);
      this.cartService.updateCartProduct(itemDetails).subscribe(SuccessfullServerRequestData => {
        this.shareDataService.getCartProducts();
        console.log(SuccessfullServerRequestData, ' Product was updated succesfully');
      }, serverErrorResponse => {
        alert("Error 1!" + serverErrorResponse);
      });  
    }
  }

  reduceAmountFromProduct(index: number) {
    let cartCopy = [...this.shareDataService.cartProducts];
    if (cartCopy[index].amount > 1) {
      cartCopy[index].amount = cartCopy[index].amount - 1;
      let productId = cartCopy[index].productId;
      let amount = cartCopy[index].amount;
      let productName = cartCopy[index].productName;
      let price = cartCopy[index].price;
      let generalPrice = (amount * price);
      let cartId = parseInt(sessionStorage.getItem("cartId"), 10);
      let itemDetails: CartItemDetails = new CartItemDetails(productId, cartId, amount, productName, generalPrice);
      this.cartService.updateCartProduct(itemDetails).subscribe(SuccessfullServerRequestData => {
        this.shareDataService.getCartProducts();
        console.log(SuccessfullServerRequestData, ' Product was updated succesfully');
      }, serverErrorResponse => {
        alert("Error 1!" + serverErrorResponse);
      });
    }
  }
}