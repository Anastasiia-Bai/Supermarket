import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../components/admin/admin.component';
import { HomeComponent } from '../components/home/home.component';
import { OrderComponent } from '../components/order/order.component';
import { RegisterComponent } from '../components/register/register.component';
import { ShopComponent } from '../components/shop/shop.component';
import { StartComponent } from '../components/start/start.component';
import { HomeGuard } from '../guards/home.guard';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "shop", canActivate: [HomeGuard], component: ShopComponent},
  {path: "home", canActivate: [HomeGuard], component: HomeComponent},
  {path: "admin", canActivate: [HomeGuard], component: AdminComponent},
  {path: "order", canActivate: [HomeGuard], component: OrderComponent},
  {path: "", pathMatch: "full", component: StartComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }