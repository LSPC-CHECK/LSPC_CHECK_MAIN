import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pqrs } from 'src/app/models/Pqrs';
import { UserService } from '../user/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {

  token = localStorage.getItem('token');

  // headers donde enviamos el token para ser autorizados
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    }),
  }
  constructor(private http: HttpClient, private _userService: UserService) { }

  tkDecode = this._userService.tknDecode(this.token);

  // Listar todos los registros
  getPqrs(): Observable<any>{
    return this.http.get(`${environment.BASE_URL}/pqrs/`, this.httpOptions);
  }
  // Listar todos los registros por usuario
  getPqrsByUser(): Observable<any>{
    return this.http.get(`${environment.BASE_URL}/pqrs/userPqrs/` + this.tkDecode.idUser, this.httpOptions);
  }
  // Crear Registro
  addPqrs(pqrs: Pqrs): Observable<any>{
    return this.http.post(`${environment.BASE_URL}/pqrs/`, pqrs, this.httpOptions);
  }
  // Listar registro por ID
  getsPqrs(idInform: string): Observable<any>{
    return this.http.get(`${environment.BASE_URL}/pqrs/` + idInform, this.httpOptions);
  }
  // Editar registro por ID
  updatePqrs(idInform: string, pqrs: Pqrs): Observable<any>{
    return this.http.put(`${environment.BASE_URL}/pqrs/` + idInform, pqrs, this.httpOptions);
  }
}
