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
    let url = `${this.baseUrl}team/labels`;
    return this.http.get<any>(url); 
  };

  getPlayersByTeamName(teamName):Observable<any>{
    let url = `${this.baseUrl}teams/${teamName}`;
    return this.http.get<any>(url)
  }

}
