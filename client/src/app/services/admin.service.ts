import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public onEditProductClicked: boolean = false;
  public addProductForm: boolean = false;
  public productId: number;
  public productName: string;
  public price: number;

  constructor(private http: HttpClient) { }

  public addProduct(productData: Product): Observable<Product[]> {    
    return this.http.post<Product[]>("http://localhost:3001/products/", productData);
  }

  public editProduct(productData: Product, productId: number): Observable<Product[]> {     
    return this.http.put<Product[]>(`http://localhost:3001/products/${productId}`, productData);
  }

  public upload(formData: FormData) {
    return this.http.post("http://localhost:3001/images", formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}