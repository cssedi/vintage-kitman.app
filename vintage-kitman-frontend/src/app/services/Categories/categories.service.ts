import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Size } from 'src/app/models/categories/size';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  baseAPIURL = environment.deployedAPIURL+ "Products/"
  baseAPIURL2 = environment.deployedAPIURL+ "Categories/"

  getAllSports()
  {
    return this.http.get(this.baseAPIURL+"GetAllSports")
  }

  getKitsByLeagueName(name:string){
    return this.http.get(this.baseAPIURL+"GetKitsByLeague/"+name)
  }

  getTeamsBySportName(name:string){
    return this.http.get(this.baseAPIURL2+"GetTeamsBySport/"+name)
  }
  getAllSizes():Observable<Size[]>{
    return this.http.get<Size[]>(this.baseAPIURL2+"GetAllSizes")
  }

}
