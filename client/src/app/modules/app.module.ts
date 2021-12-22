import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../components/app/app.component';
import { RegisterComponent } from '../components/register/register.component';
import { HeaderComponent } from '../components/header/header.component';
import { LoginComponent } from '../components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { ProductsComponent } from '../components/products/products.component';
import { MaterialModule } from '../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartComponent } from '../components/start/start.component';
import { BComponent } from '../components/b/b.component';
import { CComponent } from '../components/c/c.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogWelcomeComponent } from '../components/dialog-welcome/dialog-welcome.component';
import { ShopComponent } from '../components/shop/shop.component';
import { CartComponent } from '../components/cart/cart.component';
import { HomeComponent } from '../components/home/home.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { AdminComponent } from '../components/admin/admin.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { OrderComponent } from '../components/order/order.component';
import { DialogOrderComponent } from '../components/dialog-order/dialog-order.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    LoginComponent,
    ProductsComponent,
    StartComponent,
    BComponent,
    CComponent,
    DialogWelcomeComponent,
    ShopComponent,
    CartComponent,
    HomeComponent,
    WelcomeComponent,
    AdminComponent,
    OrderComponent,
    DialogOrderComponent,
  ],
  entryComponents: [DialogOrderComponent, DialogWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    AngularFileUploaderModule,
  ],
  providers: [UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }