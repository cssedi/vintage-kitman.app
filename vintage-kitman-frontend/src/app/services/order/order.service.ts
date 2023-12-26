import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { kitVM } from 'src/app/models/categories/kit-vm';
import { CartItem } from 'src/app/models/orders/CartItem-vm';
import { CartTotalVM } from 'src/app/models/orders/CartTotal-vm';
import { CustomOrderVM } from 'src/app/models/orders/custom-order-vm';
import { wishlistVM } from 'src/app/models/orders/wishlist-vm';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseAPIURL = environment.baseAPIUrl+ "Order/"
  token = localStorage.getItem('token')
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    })
  };

  constructor(private http: HttpClient) { }

  createCustomOrder(model: CustomOrderVM):Observable<CustomOrderVM>{
    return this.http.post<CustomOrderVM>(this.baseAPIURL+"CreateCustomOrder", model, this.httpOptions)
  }

  addToWishlist(model:wishlistVM):Observable<wishlistVM>{
    return this.http.post<wishlistVM>(this.baseAPIURL+"AddToWishlist", model, this.httpOptions)
  }

  getWishlist():Observable<kitVM[]>{ 
    return this.http.get<kitVM[]>(this.baseAPIURL+"GetWishlist", this.httpOptions)
  }

  getCartTotal(array: CartItem[]):Observable<CartTotalVM>{
    return this.http.post<CartTotalVM>(this.baseAPIURL+"GetCartTotalPrice", array)

  }
}
