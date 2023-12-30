import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ForgotPasswordVM } from 'src/app/models/authentication/forgotpassword-vm';
import { LoginVM } from 'src/app/models/authentication/login-vm';
import { RegisterVM } from 'src/app/models/authentication/register-vm';
import { ResetPasswordVM } from 'src/app/models/authentication/reset-password-vm';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    
    baseAPIUrl= environment.deployedAPIURL+'Auth/'
    //authentication variables
    isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAdminSubject = new BehaviorSubject<boolean>(false);
  
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http:HttpClient) {}



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

  setAuthenticationStatus(isAuthenticated: boolean, isAdmin: boolean) {


    // Store authentication status in localStorage
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));

    this.isAuthenticatedSubject.next(isAuthenticated);
    this.isAdminSubject.next(isAdmin);
}




}
