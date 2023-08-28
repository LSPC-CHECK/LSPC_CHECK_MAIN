import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Computer } from 'src/app/models/Computer';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  url = 'http://localhost:4000/api/computer/';
  token = localStorage.getItem('token');
  //headers donde enviamos el token para ser autorizados
  httpOptions = {
    headers : new HttpHeaders({
      'Content-type':'application/json',
      'Accept':'application/json',
      'Authorization': `Bearer ${this.token}`,
    })
  }
  constructor(private http:HttpClient, private jwtHelper:JwtHelperService,) { }

  //listar todos los registros
  getComputers():Observable<any>{
    return this.http.get(this.url, this.httpOptions);
  }

  //Eliminar registro por ID
  deleteComputer(idComputer:string):Observable<any>{
    return this.http.delete(this.url+idComputer,this.httpOptions);
  }

  //crear registro
  addComputer(computer:Computer):Observable<any>{
    return this.http.post(this.url,computer,this.httpOptions);
  }
  //lista registro por id
  getComputer(idComputer:string):Observable<any>{
    return this.http.get(this.url + idComputer, this.httpOptions);
  }
  //lista registro por id del user
  getComputerByuserId(idUser:string):Observable<any>{
    return this.http.get(this.url + '/pcUser/' + idUser, this.httpOptions);
  }
  //editar registro por id
  updateComputer(idComputer:string,computer:Computer):Observable<any>{
    return this.http.put(this.url + idComputer,computer,this.httpOptions);
  }
}
