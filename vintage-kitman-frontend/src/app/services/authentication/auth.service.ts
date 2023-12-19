import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginVM } from 'src/app/models/authentication/login-vm';
import { RegisterVM } from 'src/app/models/authentication/register-vm';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  baseAPIUrl= environment.baseAPIUrl+'Auth/'

  UserLogin(data:LoginVM)
  {
    return this.http.post(this.baseAPIUrl+"UserLogin",data)
  }

  customerRegister(model: RegisterVM):Observable<RegisterVM>
  {
    return this.http.post<RegisterVM>(this.baseAPIUrl+"Register", model)
  }
}
