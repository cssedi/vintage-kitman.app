import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginVM } from 'src/app/models/authentication/login-vm';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  baseAPIUrl= environment.baseAPIUrl+'Auth/'

  CustomerLogin(data:LoginVM)
  {
    return this.http.post(this.baseAPIUrl+"CustomerLogin",data)
  }
}
