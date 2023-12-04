import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  baseAPIURL = environment.baseAPIUrl+ "Products/"

  getAllSports()
  {
    return this.http.get(this.baseAPIURL+"GetAllSports")
  }

  getKitsByLeagueName(name:string){
    return this.http.get(this.baseAPIURL+"GetKitsByLeague/"+name)
  }

}
