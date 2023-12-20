import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { ProductsPageComponent } from './products/products-page/products-page.component';
import { TeamsComponent } from './teams/teams.component';
import { ProductComponent } from './products/product/product.component';
import { SportTeamsComponent } from './sport-teams/sport-teams.component';
import { CartComponent } from './cart/cart.component';
import { CustomOrderComponent } from './custom-order/custom-order.component';
import { ForgotPasswordComponent } from './Authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Authentication/reset-password/reset-password.component';

const routes: Routes = 
[
  {path:'login', component: LoginComponent},
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path:'products/:id', component:ProductsPageComponent},
  {path:'teams/:name', component:TeamsComponent},
  {path:'product/:name', component:ProductComponent},
  {path:'sport-teams/:name', component:SportTeamsComponent},
  {path:'cart', component:CartComponent},
  {path:'custom-order', component:CustomOrderComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'reset-password', component:ResetPasswordComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
