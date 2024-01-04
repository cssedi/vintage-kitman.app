import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { ProductsPageComponent } from './products/products-page/products-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TeamsComponent } from './teams/teams.component';
import { ProductComponent } from './products/product/product.component';
import { SportTeamsComponent } from './sport-teams/sport-teams.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CartComponent } from './cart/cart.component';
import { CustomOrderComponent } from './custom-order/custom-order.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './Authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Authentication/reset-password/reset-password.component';
import { WishlistComponent } from './customer-dashboard/wishlist/wishlist.component';
import { PlacedOrdersComponent } from './admin-dashboard/placed-orders/placed-orders.component';
import { MyOrdersComponent } from './customer-dashboard/my-orders/my-orders.component';
import { ViewCustomOrdersComponent } from './admin-dashboard/view-custom-orders/view-custom-orders.component';
import { ShippingAddressComponent } from './admin-dashboard/shipping-address/shipping-address.component';
import { SearchQueriesComponent } from './products/search-queries/search-queries.component';
import { ViewTeamsComponent } from './admin-dashboard/view-teams/view-teams.component';
import { ViewLeaguesComponent } from './admin-dashboard/view-leagues/view-leagues.component';
import { ViewSportsComponent } from './admin-dashboard/view-sports/view-sports.component';
import { ViewKitsComponent } from './admin-dashboard/view-kits/view-kits.component';
import { BlogsComponent } from './admin-dashboard/blogs/blogs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductsPageComponent,
    TeamsComponent,
    ProductComponent,
    SportTeamsComponent,
    CartComponent,
    CustomOrderComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    WishlistComponent,
    PlacedOrdersComponent,
    MyOrdersComponent,
    ViewCustomOrdersComponent,
    ShippingAddressComponent,
    SearchQueriesComponent,
    ViewTeamsComponent,
    ViewLeaguesComponent,
    ViewSportsComponent,
    ViewKitsComponent,
    BlogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
