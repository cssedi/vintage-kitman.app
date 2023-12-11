import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import {  NbInputModule,NbStatusService,  } from '@nebular/theme';
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
import { ProductComponent } from './products/product/product.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductsPageComponent,
    TeamsComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    NbInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatTooltipModule,
    


    
    

  ],
  providers: [NbStatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
