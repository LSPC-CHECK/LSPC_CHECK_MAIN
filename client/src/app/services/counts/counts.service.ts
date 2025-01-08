import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountsService {

  token = localStorage.getItem('token');
  //headers donde enviamos el token para ser autorizados
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getCountEntSal(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/entSal/count/`, this.httpOptions);
  }
  getCountComputers(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/computer/count/`, this.httpOptions);
  }
  getCountPqrs(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/pqrs/count/`, this.httpOptions);
  }
  getCountUsers(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/user/count/`, this.httpOptions);
  }
  getCountProfile(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/profile/count/`, this.httpOptions);
  }
}
