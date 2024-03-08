import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { kitVM } from 'src/app/models/categories/kit-vm';
import { CartItem } from 'src/app/models/orders/CartItem-vm';
import { CartTotalVM } from 'src/app/models/orders/CartTotal-vm';
import { KitOrderVM } from 'src/app/models/orders/KitOrderVM';
import { OnStockKitVM } from 'src/app/models/orders/OnStockKit-vm';
import { CustomOrderVM } from 'src/app/models/orders/custom-order-vm';
import { OrderVM } from 'src/app/models/orders/order-vm';
import { wishlistVM } from 'src/app/models/orders/wishlist-vm';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseAPIURL = environment.deployedAPIURL+ "Order/"
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

  removeFromWishlist(model:kitVM):Observable<wishlistVM>{
    return this.http.post<wishlistVM>(this.baseAPIURL+"RemoveFromWishlist", model, this.httpOptions)
  }

  getWishlist():Observable<kitVM[]>{ 
    return this.http.get<kitVM[]>(this.baseAPIURL+"GetWishlist", this.httpOptions)
  }

  getCartTotal(array: CartItem[]):Observable<CartTotalVM>{
    return this.http.post<CartTotalVM>(this.baseAPIURL+"GetCartTotalPrice", array)
  }
  getAllCustomOrders():Observable<CustomOrderVM[]>{ 
    return this.http.get<CustomOrderVM[]>(this.baseAPIURL+"GetAllCustomOrders", this.httpOptions)
  }

  rejectOrder(order:CustomOrderVM):Observable<CustomOrderVM>{
    return this.http.put<CustomOrderVM>(this.baseAPIURL+"RejectOrder",order,this.httpOptions)
  }
  getUserCustomOrders():Observable<CustomOrderVM[]>{
    return this.http.get<CustomOrderVM[]>(this.baseAPIURL+"GetUserCustomOrders", this.httpOptions)
  }
  confirmCustomOrder(order:CustomOrderVM):Observable<CustomOrderVM>{
    return this.http.put<CustomOrderVM>(this.baseAPIURL+"AcceptOrder",order,this.httpOptions)
  }

  getOnStockKits():Observable<OnStockKitVM[]>{ 
    return this.http.get<OnStockKitVM[]>(this.baseAPIURL+"GetAllOnStockKits", this.httpOptions)
  }

  addOnstockKit(model: OnStockKitVM):Observable<OnStockKitVM>{
    return this.http.post<OnStockKitVM>(this.baseAPIURL+"AddOnStockOrder",model, this.httpOptions)
  }
  homePageOnStockKits():Observable<OnStockKitVM[]>{
    return this.http.get<OnStockKitVM[]>(this.baseAPIURL+"GetHomePageOnStockKits", this.httpOptions)
  }
  createOrder(model: KitOrderVM[]):Observable<KitOrderVM>{
    return this.http.post<KitOrderVM>(this.baseAPIURL+"CreateOrder", model, this.httpOptions)
  }
  getUserOrders(): Observable<KitOrderVM[]>{
    return this.http.get<KitOrderVM[]>(this.baseAPIURL+"GetUserOrders", this.httpOptions)
  }
  getMonthlyOrders():Observable<KitOrderVM[]>{
    return this.http.get<KitOrderVM[]>(this.baseAPIURL+"GetMonthlyOrders", this.httpOptions)
  }
  getOrders():Observable<KitOrderVM[]>{
    return this.http.get<KitOrderVM[]>(this.baseAPIURL+"GetAllOrders", this.httpOptions)
  }
  getCustomOrders():Observable<CustomOrderVM[]>{
    return this.http.get<CustomOrderVM[]>(this.baseAPIURL+"GetHistoricCustomOrders", this.httpOptions)
  }
  updateBulkOrderStatus(orderNum: string):Observable<KitOrderVM>{
    return this.http.post<KitOrderVM>(this.baseAPIURL+"BulkOrderPlaced/"+orderNum, this.httpOptions)
  }
  updateDeliveryStatus(orderNum: string, trackingLink: string): Observable<KitOrderVM> {
    const body = { orderNum, trackingLink };
    return this.http.post<KitOrderVM>(this.baseAPIURL + "OrderDelivered", body, this.httpOptions);
  }
  
}
