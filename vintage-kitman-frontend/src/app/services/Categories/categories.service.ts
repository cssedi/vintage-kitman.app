import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaguesVM } from 'src/app/models/categories/leagues-vm';
import { Size } from 'src/app/models/categories/size';
import { SportsVM } from 'src/app/models/categories/sports-vm';
import { TeamsVM } from 'src/app/models/categories/teams-vm';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  baseAPIURL = environment.baseAPIUrl+ "Products/"
  baseAPIURL2 = environment.baseAPIUrl+ "Categories/"
  token = localStorage.getItem('token')
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    })
  };

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
  getLeagueBySportName(name:string){
    return this.http.get(this.baseAPIURL2+"GetLeaguesBySport/"+name, this.httpOptions)
  }

  //create endpoints
  createTeam(model:TeamsVM):Observable<TeamsVM>{
    return this.http.post<TeamsVM>(this.baseAPIURL2+"CreateTeam", model)
  }

  createLeague(model:LeaguesVM):Observable<LeaguesVM>{
    return this.http.post<LeaguesVM>(this.baseAPIURL2+"CreateLeague", model, this.httpOptions)
  }
  createSport(model:SportsVM):Observable<SportsVM>{
    return this.http.post<SportsVM>(this.baseAPIURL2+"CreateSport", model, this.httpOptions)
  }
  //update endpoints
  updateTeam(name: string, model:TeamsVM):Observable<TeamsVM>{
    return this.http.put<TeamsVM>(this.baseAPIURL2+"UpdateTeam/"+name, model, this.httpOptions)
  }

  //delete endpoints
  deleteTeam(name:string){
    return this.http.delete(this.baseAPIURL2+"DeleteTeam/"+name, this.httpOptions)
  }

  deleteLeague(name:string){
    return this.http.delete(this.baseAPIURL2+"DeleteLeague/"+name, this.httpOptions)
  }
  deleteSport(name:string){
    return this.http.delete(this.baseAPIURL2+"DeleteSport/"+name, this.httpOptions)
  }
}
