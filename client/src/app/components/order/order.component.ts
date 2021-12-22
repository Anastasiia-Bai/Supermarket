import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItemDetails } from 'src/app/models/CartItemDetails';
import { ShareDataService } from 'src/app/services/share-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orderForm: FormGroup;
  public lastOrderDate: Date;
  public formNotes = "";
  public isNote: boolean = false;
  public city = "";
  public street = "";
  public cartProducts: CartItemDetails[] = [];
  public finalPrice: number;
  public url: string = "http://localhost:3001/images/";

  constructor(public cartService: CartService, public fb: FormBuilder, public router: Router, 
              public usersService: UsersService, public shareDataService: ShareDataService, 
              public dialog: MatDialog) { }

  ngOnInit(): void {    
    this.shareDataService.getCartProducts();

    this.orderForm = this.fb.group({
      userId: sessionStorage.getItem('userId'),
      cartId: sessionStorage.getItem('cartId'),
      finalPrice: this.shareDataService.getSum(),
      sendCity: [this.city, Validators.required],
      sendStreet: [this.street, Validators.required],
      sendDate: ["", Validators.required],
      payEnd: ["", [Validators.required, Validators.minLength(16)]]
    });    
  };

  public onBackToShopClicked() {
    this.router.navigate(["/shop"]);
  }

  public newOrder() {
    this.orderForm.value.payEnd = this.orderForm.value.payEnd%10000;
    if (this.orderForm.value.sendCity && this.orderForm.value.sendStreet && this.orderForm.value.sendDate && this.orderForm.value.payEnd) {
      if (this.orderForm.controls.payEnd.valid) {
        this.cartService.addOrder(this.orderForm.value).subscribe(
          orderData => {
            console.log(orderData);
            this.openDialog();
            this.lastOrderDateFunc();
          }, serverErrorResponse => {
            alert("Faild add new order " + serverErrorResponse);
          });
      } else {
        this.isNote = true;
        this.formNotes = "Credit card number is wrong";
      }
    } else {
      this.isNote = true;
      this.formNotes = "You have to fill all the blanks";
    }
  };

  public lastOrderDateFunc() {
    this.cartService.getLastOrderDate().subscribe(
      res => {
        this.usersService.lastOrderDate = res;
      }, serverErrorResponse => {
        alert("Faild last order date " + serverErrorResponse);
      });
  };

  public getCity() {
    this.usersService.getUserCity().subscribe(
      userCity => {
        this.orderForm.value.sendCity = userCity[0].city;
        this.city = userCity[0].city;
        this.orderForm.controls.sendCity.setValue(this.city);
      }, serverErrorResponse => {
        alert("Faild get user city " + serverErrorResponse);
      });
  };

  public getStreet() {
    this.usersService.getUserStreet().subscribe(
      userStreet => {
        this.orderForm.value.sendstreet = userStreet[0].street;
        this.street = userStreet[0].street;
        this.orderForm.controls.sendStreet.setValue(this.street);
      }, serverErrorResponse => {
        alert("Faild get user street " + serverErrorResponse);
      });
  };

  public openDialog() {
    this.dialog.open(DialogOrderComponent, {
      disableClose: false,
    });
  }
}