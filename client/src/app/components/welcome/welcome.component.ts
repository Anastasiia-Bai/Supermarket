import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public firstName: string;
  public userCreateCartDate: string;
  public userLastOrderDate: string;
  public userHasOrder: boolean = false;

  constructor(public router: Router, public usersService: UsersService, public cartService: CartService) { }

  ngOnInit(): void {
    this.hasCart();
    this.firstName = sessionStorage.getItem('firstName');
  }

  public onStartShoppingClicked(): void {
    if(sessionStorage.getItem('token')) {
      let userType = this.usersService.getLoginToken('role');
      if(userType === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if( userType === 'CUSTOMER') {
        if(this.usersService.hasCart) {
          this.router.navigate(["/shop"]);
        } else {
          this.newUserCart();
          this.cartId();
          this.router.navigate(["/shop"]);
        }
      } else {
        this.router.navigate(['']);
      }
    }
  }

  public hasCart() {
    const observable = this.usersService.userHasCart();
    observable.subscribe(amountOfCarts => {
        if (amountOfCarts.amountOfCarts == 1) {
          this.usersService.hasCart = true;
          this.cartId();
          this.cartDate();
          this.orderDate();
        } else {
          this.usersService.hasCart = false;
        }
      }, serverErrorRespponce => {
        console.log("Error! " + serverErrorRespponce.message);
      });
  };

  public newUserCart() {
    const observable = this.cartService.addNewCart();
    observable.subscribe(userId => {
      console.log(userId)
    }, serverErrorRespponce => {
      console.log("Error! " + serverErrorRespponce.message);
    })
  }

  public cartDate() {
    const observable = this.cartService.getCartDate();
    observable.subscribe(cartDate => {
      this.userCreateCartDate = cartDate.cartDate;
    }, serverErrorRespponce => {
      console.log("Error! " + serverErrorRespponce.message);
    });
  }

  public orderDate() {
    const observable2 = this.cartService.getLastOrderDate();
    observable2.subscribe(userLastOrderDate => {
      this.userLastOrderDate = userLastOrderDate.orderDate;
      if(this.userLastOrderDate != null) {
        this.userHasOrder = true;
      }
    }, serverErrorRespponce => {
      console.log("Error! " + serverErrorRespponce.message);
    });
  }

  public cartId() {
    const observable = this.cartService.getCartId();
    observable.subscribe(cartId => {
        sessionStorage.setItem("cartId", cartId.cartId);
      }, serverErrorRespponce => {
        console.log("Error! " + serverErrorRespponce.message);
      });
  };
}