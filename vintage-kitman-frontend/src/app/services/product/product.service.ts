import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { kitVM } from 'src/app/models/categories/kit-vm';
import { TeamsVM } from 'src/app/models/categories/teams-vm';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  baseAPIURL = environment.deployedAPIURL+ "Products/"
  token = localStorage.getItem('token')
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    })
  };

  getTeamsByLeagueName(name:string):Observable<TeamsVM[]>{
    return this.http.get<TeamsVM[]>(this.baseAPIURL+"GetTeamsByLeague/"+name)
  }

  getKitsByTeam(id:number):Observable<kitVM[]>{
    return this.http.get<kitVM[]>(this.baseAPIURL+"GetKitsByTeam/"+id)
  }

  getKitByName(name:string):Observable<kitVM>{
    return this.http.get<kitVM>(this.baseAPIURL+"GetKitByName/"+name)
  }
  searchKits(searchTerm:string):Observable<kitVM[]>{
    return this.http.get<kitVM[]>(this.baseAPIURL+"SearchKits/"+searchTerm)
  }

  getKitsByTeamName(name:string):Observable<kitVM[]>{
    return this.http.get<kitVM[]>(this.baseAPIURL+"GetKitsByName/"+name)
  }
  //updateKit
  updateKit(kitname:string, model:kitVM):Observable<kitVM>{
    return this.http.put<kitVM>(this.baseAPIURL+"UpdateKit/"+kitname,model,this.httpOptions)
  }
  //deleteKit
  deleteKit(name:string):Observable<kitVM>{
    return this.http.delete<kitVM>(this.baseAPIURL+"DeleteKit/"+name,this.httpOptions)
  }

  
}
