import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.css']
})
export class DialogOrderComponent implements OnInit {
  public receiptContent = "\r\n" + " " + sessionStorage.getItem('firstName') + "'s " + "Receipt:" + "\r\n";
  public cartId = parseInt(sessionStorage.getItem('cartId'), 10);
  public dateOfOrder = new Date();

  constructor(public usersService: UsersService, public productsService: ProductService, public shareDataService: ShareDataService, 
              public cartService: CartService, public router: Router) { }

  ngOnInit(): void {
    this.shareDataService.receiptFileContent.forEach((cartProducts: any) => {
      this.receiptContent += "\r\n" + "\r\n";
      this.receiptContent += "Product: " + cartProducts.productName + "   ";
      this.receiptContent += "Amount: " + cartProducts.amount + "   ";
      this.receiptContent += "Price: " + cartProducts.price + " ₪" + "   ";
      this.receiptContent += "Sum: " + cartProducts.price * cartProducts.amount;
    });

    this.receiptContent += "\r\n";
    this.receiptContent += "\r\n";
    this.receiptContent += "Total: " + this.shareDataService.finalPrice + " ₪" + "   ";
    this.receiptContent += "\r\n";
    this.receiptContent += "Date of order: " + this.dateOfOrder;
  }

  public deleteAllCartProducts() {
    this.router.navigate(['/home']);
    const observable = this.cartService.deleteAllCartProducts(this.cartId);
    observable.subscribe(res => {
      console.log(res);
    })
  }

  public getReceipt() {
    this.cartService.createReceipt({ "content": this.receiptContent.toString() }).subscribe(
      res => {
        console.log(res);
        console.log({ "content": this.receiptContent.toString() });
        this.downloadFile();
        window.open('http://localhost:3001/downloadReceip', "_blank");
      },
      err => console.log(err)
    );
  };

  public downloadFile() {
    this.cartService.downloadReceipt().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  };
}