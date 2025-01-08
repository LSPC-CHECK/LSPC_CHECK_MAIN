import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntSal } from 'src/app/models/EntSal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntsalService {

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
    return this.http.post(`${environment.BASE_URL}/entSal/`, data, this.httpOptions);
  }
  // Listar todos los registros
  getsEntSal():Observable<any>{
    return this.http.get(`${environment.BASE_URL}/entSal/`, this.httpOptions);
  }

}
