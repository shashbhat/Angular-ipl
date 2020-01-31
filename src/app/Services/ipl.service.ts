import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IplService {

  baseUrl = "https://flask-ipl.herokuapp.com/ipl/"
  
  constructor(private http:HttpClient) { }

  teamLabels():Observable<any>{
    let url = `${this.baseUrl}labels`;
    return this.http.get<any>(url); 
  };

  getTeamDetails():Observable<any>{
    let url = `${this.baseUrl}teams`
    return this.http.get<any>(url);
  }

  getPlayersByTeamName(teamName):Observable<any>{
    let url = `${this.baseUrl}team/${teamName}`;
    return this.http.get<any>(url)
  }

  getTeamRoleStat(teamname):Observable<any>{
    let url = `${this.baseUrl}team/rolestat/${teamname}`
    return this.http.get<any>(url)
  }

  getPlayersByTeamandRole(teamname, role):Observable<any>{
    let url = `${this.baseUrl}team/${role}/${teamname}`
    return this.http.get<any>(url)
  }

  getPlayersPriceByTeam(teamname):Observable<any>{
    let url = `${this.baseUrl}team/${teamname}/totalprice`
    return this.http.get<any>(url)
  }
}
