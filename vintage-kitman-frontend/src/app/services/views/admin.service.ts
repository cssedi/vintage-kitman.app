import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { TokenData } from 'src/app/models/authentication/tokendata';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }
  canActivate(): boolean {
    var isAdmin : boolean = false
    if(localStorage.getItem('token'))
    {
      var token = localStorage.getItem('token')!;

      var decoded : TokenData = jwtDecode(token);
      
       if(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'ADMIN' ){
        
        return true
       }
       
    }
    

     return isAdmin;
   }
}
