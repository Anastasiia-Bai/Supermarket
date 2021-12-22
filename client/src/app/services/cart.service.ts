import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  public getCartId(): Observable<any> {
    return this.http.get("http://localhost:3001/products/getCartId/" + sessionStorage.getItem('userId'))
  }

  public getCartDate(): Observable<any> {
    return this.http.get("http://localhost:3001/products/cartdate/" + sessionStorage.getItem('userId'))
  }

  public getLastOrderDate(): Observable<any> {
    return this.http.get("http://localhost:3001/products/lastOrderDate/" + sessionStorage.getItem('userId'))
  }

  public addNewCart(): Observable<any> {
    return this.http.post<any>(`http://localhost:3001/products/newcart`, {});
  }

  public addCartItem(cartItemDetails: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3001/products/addCartItem`, cartItemDetails);
  }

  public getAllCartItems(): Observable<any>{
    return this.http.get<any>("http://localhost:3001/products/showCart/" + sessionStorage.getItem('cartId'));
  } 

  public deleteCartProduct(cartId: number, productId: number): Observable<any>{
    return this.http.delete<any>(`http://localhost:3001/products/deleteCartProduct/` + cartId + "/" + productId);
  }

  public updateCartProduct(cartItemDetails: any): Observable<any>{
    return this.http.put<any>(`http://localhost:3001/products/updateCartProduct`, cartItemDetails);
  }

  public addOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3001/products/neworder`, orderData); 
  }

  public deleteAllCartProducts(cartId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3001/products/deleteAllProducts/` + cartId);
  }

  public createReceipt(body: any): Observable<any> {
    return this.http.post("http://localhost:3001/receiptFile", body, {
      headers: { 'Content-Type': 'application/json', 'Authorization': sessionStorage.getItem('token') },
      responseType: "text"
    });
  };

  public downloadReceipt(): Observable<any> {
    return this.http.get("http://localhost:3001/downloadReceip", {
      headers: { 'Authorization': sessionStorage.getItem('token') },
      responseType: "text"
    });
  };
}
