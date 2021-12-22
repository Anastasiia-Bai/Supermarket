import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public totalPrice: number;
  public term = "";
  
  constructor(private http: HttpClient) { }

  public getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3001/products/bycategory/` + categoryId);
  }

  public getCategories(): Observable<any> {
    return this.http.get("http://localhost:3001/products/categories");
  }

  public getAmountOfProducts(): Observable<any> {
    return this.http.get("http://localhost:3001/products/amountOfProducts");
  }

  public getAmountOfOrders(): Observable<any> {
    return this.http.get("http://localhost:3001/products/amountOfOrders");
  }
}