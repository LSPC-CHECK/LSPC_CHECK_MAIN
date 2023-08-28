import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = localStorage.getItem('token');

  url = 'http://localhost:4000/api/user/';

  // headers donde enviamos el token para ser autorizados
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    }),
  }
  httpOptionsImages = {
    headers: new HttpHeaders({
      'Content-Type': 'image/*',
      'Accept': 'image/*',
      'Authorization': `Bearer ${this.token}`,
    }),
  }
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  // Crear Registro
  addUser(user: User): Observable<any>{
    return this.http.post(this.url, user, this.httpOptions);
  }
  // Listar todos los registros
  getUsers(): Observable<any>{
    return this.http.get(this.url, this.httpOptions);
  }
  // Listar registro por ID
  getUser(idUser: string): Observable<any>{
    return this.http.get(this.url + idUser, this.httpOptions);
  }
  //obetener imagen
  getImageUser(idUser:string): Observable<Blob>{
    return this.http.get(this.url + idUser + '/getimage',{responseType:'blob'});
  }
  // Editar registro por ID
  updateUser(idUser: string, user: User): Observable<any>{
    return this.http.put(this.url + idUser, user, this.httpOptions);
  }
  //actualizar la imagen del usuario
  updateImageUser(idUser:string, imgData:any):Observable<any>{
    return this.http.put(this.url + idUser + '/image', imgData);
  }

  // Eliminar registro por ID
  deleteUser(idUser: string): Observable<any>{
    return this.http.delete(this.url + idUser, this.httpOptions);
  }
  // login
  login(user: any): Observable<any>{
    return this.http.post(this.url + 'login', user);
  }
  // Validaciones de que el token sea valido
  isAuth():boolean{
    if (this.jwtHelper.isTokenExpired(this.token) && !localStorage.getItem('token')) return false;

    return true;
  }
  //decodificacion del token para llamar la informacion\
  tknDecode(token:any){
    let tokenDecoded = this.jwtHelper.decodeToken(token);
    return tokenDecoded;
  }
}
