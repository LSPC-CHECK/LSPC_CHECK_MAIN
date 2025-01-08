import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = localStorage.getItem('token');

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
    return this.http.post(`${environment.BASE_URL}/user/`, user, this.httpOptions);
  }
  // Listar todos los registros
  getUsers(): Observable<any>{
    return this.http.get(`${environment.BASE_URL}/user/`, this.httpOptions);
  }
  // Listar registro por ID
  getUser(idUser: string): Observable<any>{
    return this.http.get(`${environment.BASE_URL}/user/` + idUser, this.httpOptions);
  }
  //obetener imagen
  getImageUser(idUser:string): Observable<Blob>{
    return this.http.get(`${environment.BASE_URL}/user/` + idUser + '/getimage',{responseType:'blob'});
  }
  // Editar registro por ID
  updateUser(idUser: string, user: User): Observable<any>{
    return this.http.put(`${environment.BASE_URL}/user/` + idUser, user, this.httpOptions);
  }
  //actualizar la imagen del usuario
  updateImageUser(idUser:string, imgData:any):Observable<any>{
    return this.http.put(`${environment.BASE_URL}/user/` + idUser + '/image', imgData);
  }

  // Eliminar registro por ID
  deleteUser(idUser: string): Observable<any>{
    return this.http.delete(`${environment.BASE_URL}/user/` + idUser, this.httpOptions);
  }
  // login
  login(user: any): Observable<any>{
    return this.http.post(`${environment.BASE_URL}/user/login`, user);
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
