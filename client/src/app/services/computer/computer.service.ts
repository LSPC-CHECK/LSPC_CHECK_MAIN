import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Computer } from 'src/app/models/Computer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
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

  //listar todos los registros
  getComputers():Observable<any>{
    return this.http.get(`${environment.BASE_URL}/computer/`, this.httpOptions);
  }

  //Eliminar registro por ID
  deleteComputer(idComputer:string):Observable<any>{
    return this.http.delete(`${environment.BASE_URL}/computer/`+idComputer,this.httpOptions);
  }

  //crear registro
  addComputer(computer:Computer):Observable<any>{
    return this.http.post(`${environment.BASE_URL}/computer/`,computer,this.httpOptions);
  }
  //lista registro por id
  getComputer(idComputer:string):Observable<any>{
    return this.http.get(`${environment.BASE_URL}/computer/` + idComputer, this.httpOptions);
  }
  //lista registro por id del user
  getComputerByuserId(idUser:string):Observable<any>{
    return this.http.get(`${environment.BASE_URL}/computer/pcUser/` + idUser, this.httpOptions);
  }
  //editar registro por id
  updateComputer(idComputer:string,computer:Computer):Observable<any>{
    return this.http.put(`${environment.BASE_URL}/computer/` + idComputer,computer,this.httpOptions);
  }
}
