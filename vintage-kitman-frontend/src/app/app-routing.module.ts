import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { ProductsPageComponent } from './products/products-page/products-page.component';

const routes: Routes = 
[
  {path:'login', component: LoginComponent},
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent},
  {path:'products', component:ProductsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
