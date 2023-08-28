import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private serverUrl  = 'http://localhost:4000/';

  constructor(private http: HttpClient) {}

  sendPasswordResetEmail(email: string): Observable<any> {
    const url = `${this.serverUrl}/forgot-password`;
    return this.http.post<any>(url, { email });
  }

  resetPassword(user: User): Observable<any> {
    const url = `${this.serverUrl}/reset-password/${user.resetPasswordToken}`;
    return this.http.post<any>(url, { password: user.password });
  }
}
