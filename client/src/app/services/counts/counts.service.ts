import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountsService {

  EntSal = 'http://localhost:4000/entSal/count';
  Computer = 'http://localhost:4000/computer/count';
  Pqrs = 'http://localhost:4000/pqrs/count';
  User = 'http://localhost:4000/user/count';
  Profile = 'http://localhost:4000/profile/count';

  token = localStorage.getItem('token');
  //headers donde enviamos el token para ser autorizados
  httpOptions = {
    headers : new HttpHeaders({
      'Content-type':'application/json',
      'Accept':'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  }

  constructor(private http:HttpClient) { }

  getCountEntSal():Observable<any>{
    return this.http.get(this.EntSal,this.httpOptions);
  }
  getCountComputers():Observable<any>{
    return this.http.get(this.Computer,this.httpOptions);
  }
  getCountPqrs():Observable<any>{
    return this.http.get(this.Pqrs,this.httpOptions);
  }
  getCountUsers():Observable<any>{
    return this.http.get(this.User,this.httpOptions);
  }
  getCountProfile():Observable<any>{
    return this.http.get(this.Profile,this.httpOptions);
  }
}
