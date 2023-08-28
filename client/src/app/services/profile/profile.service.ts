import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url = 'http://localhost:4000/api/profile/';
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

  // Listar todos los registros
  getProfiles(): Observable<any>{
    return this.http.get(this.url, this.httpOptions);
  }
  // Eliminar registro por ID
  deleteProfile(idProfile: string): Observable<any>{
    return this.http.delete(this.url + idProfile, this.httpOptions);
  }
  // Crear Registro
  addProfile(profile: Profile): Observable<any>{
    return this.http.post(this.url, profile, this.httpOptions);
  }
  // Listar registro por ID
  getProfile(idProfile: string): Observable<any>{
    return this.http.get(this.url + idProfile, this.httpOptions);
  }
  // Editar registro por ID
  updateProfile(idProfile: string, profile: Profile): Observable<any>{
    return this.http.put(this.url + idProfile, profile, this.httpOptions);
  }

  getRoles(){
    let rols:any = [];
    this.getProfiles().subscribe(data =>{
      data.map((e:any) =>{
        rols.push(e.name);
      });
    });
    return rols;
  }

}
