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
import { WishlistComponent } from './customer-dashboard/wishlist/wishlist.component';
import { PlacedOrdersComponent } from './admin-dashboard/placed-orders/placed-orders.component';
import { MyOrdersComponent } from './customer-dashboard/my-orders/my-orders.component';
import { ShippingAddressComponent } from './customer-dashboard/shipping-address/shipping-address.component';
import { ViewCustomOrdersComponent } from './admin-dashboard/view-custom-orders/view-custom-orders.component';
import { SearchQueriesComponent } from './products/search-queries/search-queries.component';
import { ViewSportsComponent } from './admin-dashboard/view-sports/view-sports.component';
import { ViewLeaguesComponent } from './admin-dashboard/view-leagues/view-leagues.component';
import { ViewTeamsComponent } from './admin-dashboard/view-teams/view-teams.component';
import { ViewKitsComponent } from './admin-dashboard/view-kits/view-kits.component';
import { BlogsComponent } from './admin-dashboard/blogs/blogs.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OnStockKitsComponent } from './admin-dashboard/on-stock-kits/on-stock-kits.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PoliciesComponent } from './policies/policies.component';
import { ApprovedPaymentComponent } from './transactions/approved-payment/approved-payment.component';
import { PaymentFailedComponent } from './transactions/payment-failed/payment-failed.component';
import { ViewAllOrdersComponent } from './admin-dashboard/view-all-orders/view-all-orders.component';
import { ViewAllCustomOrdersComponent } from './admin-dashboard/view-all-custom-orders/view-all-custom-orders.component';
import { ReturnsPolicyComponent } from './returns-policy/returns-policy.component';
import { AuthGuardService } from './guard/authguard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'products/:id', component: ProductsPageComponent },
  { path: 'teams/:name', component: TeamsComponent },
  { path: 'product/:name', component: ProductComponent },
  { path: 'sport-teams/:name', component: SportTeamsComponent },
  { path: 'cart', component: CartComponent}, 
  { path: 'custom-order', component: CustomOrderComponent, canActivate: [AuthGuardService] }, 
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuardService] }, 
  { path: 'placed-orders', component: PlacedOrdersComponent, canActivate: [AuthGuardService], data: { role: 'ADMIN' } },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuardService] }, 
  { path: 'shipping-address', component: ShippingAddressComponent, canActivate: [AuthGuardService] }, 
  { path: 'blogs', component: BlogsComponent, canActivate: [AuthGuardService], data: { role: 'ADMIN' } }, 
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] }, 
  { path: 'on-stock-kits', component: OnStockKitsComponent, canActivate: [AuthGuardService], data: { role: 'ADMIN' } }, 
  { path: 'about-us', component: AboutUsComponent },
  { path: 'policies', component: PoliciesComponent },
  { path: 'approved-payment', component: ApprovedPaymentComponent },
  { path: 'payment-failed', component: PaymentFailedComponent },
  { path: 'view-all-orders', component: ViewAllOrdersComponent, canActivate: [AuthGuardService], data: { role: 'ADMIN' } }, 
  { path: 'view-all-custom-orders', component: ViewAllCustomOrdersComponent, canActivate: [AuthGuardService], data: { role: 'ADMIN' } }, 
  { path: 'returns-policy', component: ReturnsPolicyComponent },
  { path: 'search-queries/:name', component: SearchQueriesComponent}, 
  { path: 'view-sports', component: ViewSportsComponent, canActivate: [AuthGuardService], data: { role: 'ADMIN' } }, 
  { path: 'view-leagues/:name', component: ViewLeaguesComponent, canActivate: [AuthGuardService], data: { role: 'ADMIN' } },
  { path: 'view-teams/:name', component: ViewTeamsComponent, canActivate: [AuthGuardService], data: { role: 'ADMIN' } }, 
  { path: 'view-kits/:name', component: ViewKitsComponent, canActivate: [AuthGuardService], data: { role: 'ADMIN' } }, 
  { path: 'view-custom-orders', component: ViewCustomOrdersComponent, canActivate: [AuthGuardService], data: { role: 'ADMIN' } }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


