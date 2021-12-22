import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-c',
  templateUrl: './c.component.html',
  styleUrls: ['./c.component.css']
})
export class CComponent implements OnInit {

  public amountOfProducts: number;
  public amountOfOrders: number;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAmountOfProducts().subscribe(amountOfProducts => { 
      this.amountOfProducts = amountOfProducts.amountOfProducts;
    }, serverErrorResponse => {
      alert("Error 6!" + serverErrorResponse);
    });

    this.productService.getAmountOfOrders().subscribe(amountOfOrders => { 
      this.amountOfOrders = amountOfOrders.amountOfOrders;
    }, serverErrorResponse => {
      alert("Error 6!" + serverErrorResponse);
    });
  }
}