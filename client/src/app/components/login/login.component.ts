import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router, private cartService: CartService) { }

  public email: string = '';
  public password: string = '';

  public onLoginClicked(): void {

    let userLoginDetails = new UserLoginDetails(this.email, this.password);
    const observable = this.usersService.login(userLoginDetails);

    observable.subscribe((successfulServerRequestData: any) => {
      sessionStorage.setItem('token', "Bearer " + successfulServerRequestData.token);
      sessionStorage.setItem('role', successfulServerRequestData.role);
      sessionStorage.setItem('userId', successfulServerRequestData.userId);
      sessionStorage.setItem('firstName', successfulServerRequestData.firstName);

      this.usersService.tokenCheck();

      if(successfulServerRequestData.role === "ADMIN") {
        this.router.navigate(["/admin"]);
      } else {
        this.router.navigate(["/home"]);
      }
    }, serverErrorRespponce => {
      alert("Error! " + serverErrorRespponce.message);
    });
  }

  ngOnInit(): void {
  }

}
