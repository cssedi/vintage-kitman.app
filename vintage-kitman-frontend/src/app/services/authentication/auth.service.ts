import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgotPasswordVM } from 'src/app/models/authentication/forgotpassword-vm';
import { LoginVM } from 'src/app/models/authentication/login-vm';
import { RegisterVM } from 'src/app/models/authentication/register-vm';
import { ResetPasswordVM } from 'src/app/models/authentication/reset-password-vm';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  baseAPIUrl= environment.deployedAPIURL+'Auth/'

  UserLogin(data:LoginVM)
  {
    return this.http.post(this.baseAPIUrl+"UserLogin",data)
  }

  customerRegister(model: RegisterVM):Observable<RegisterVM>
  {
    return this.http.post<RegisterVM>(this.baseAPIUrl+"Register", model)
  }

  forgotPassword(model:ForgotPasswordVM):Observable<ForgotPasswordVM>{
    return this.http.post<ForgotPasswordVM>(this.baseAPIUrl+"ForgotPassword", model)
  }

  resetPassword(model: ResetPasswordVM) : Observable<ResetPasswordVM>{
    return this.http.post<ResetPasswordVM>(this.baseAPIUrl+"ResetPassword", model);

  }
}
