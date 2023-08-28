import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntSal } from 'src/app/models/EntSal';

@Injectable({
  providedIn: 'root'
})
export class EntsalService {

  url = 'http://localhost:4000/api/entSal/';
  token = localStorage.getItem('token');
  // headers donde enviamos el token para ser autorizados
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    }),
  }

  constructor(private http: HttpClient) { }
  //registrar una entrada o salida
  postEntSal(data:EntSal):Observable<any>{
    return this.http.post(this.url, data, this.httpOptions);
  }
  // Listar todos los registros
  getsEntSal():Observable<any>{
    return this.http.get(this.url, this.httpOptions);
  }

}
