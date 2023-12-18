import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomOrderVM } from 'src/app/models/orders/custom-order-vm';
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
    return this.http.post<CustomOrderVM>(this.baseAPIURL+"CreateCustomOrder", model)
  }
}
