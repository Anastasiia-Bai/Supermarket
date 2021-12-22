import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public firstName: string;

  constructor(private router: Router, public usersService: UsersService, public productService: ProductService) { }

  public onLogoClicked(): void {
    this.router.navigate(["/home"]);
  }

  ngOnInit(): void {
    this.usersService.tokenCheck();
    this.firstName = sessionStorage.getItem('firstName');
  }

  onLogoutClicked() {
    sessionStorage.clear();
    location.reload();
  }
}
