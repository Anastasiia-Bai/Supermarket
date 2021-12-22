import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { Observable } from 'rxjs';
import { UserRegisterDetails } from '../models/UserRegisterDetails';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public isLogged: boolean = false;
  public isAdmin: boolean = false;
  public signUp: boolean = false;
  public firstName: string;
  public message = "";
  public hasCart: boolean = false;
  public hadOrder: boolean = false;
  public lastOrderDate: any;
  public loginToken: any;

  constructor(private http: HttpClient) { }

  public register(userRegisterDetails: UserRegisterDetails): Observable<UserRegisterDetails> {
    return this.http.post<UserRegisterDetails>("http://localhost:3001/users/", userRegisterDetails);
  }

  public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
  }

  public userHasCart(): Observable<any> {
    return this.http.get("http://localhost:3001/users/hascart/" + sessionStorage.getItem('userId'));
  }

  public userHasOrders(): Observable<any> {
    return this.http.get("http://localhost:3001/users/hadorders/" + sessionStorage.getItem('userId'));
  }

  public getUserCity(): Observable<any> {
    return this.http.get("http://localhost:3001/users/getcity/" + sessionStorage.getItem('userId'));
  }

  public getUserStreet(): Observable<any> {
    return this.http.get("http://localhost:3001/users/getstreet/" + sessionStorage.getItem('userId'));
  }

  public tokenCheck() {
    if (sessionStorage.getItem('token')) {
      this.isLogged = true;
      console.log("You are log in !");
    } else {
      this.isLogged = false;
    }
  }

  public getLoginToken(userData: string): any{
    return this.loginToken = sessionStorage.getItem(userData);
  }
}