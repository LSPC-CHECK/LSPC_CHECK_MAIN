import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _userService: UserService,
              private router: Router) { }

  canActivate():boolean {
    if (!this._userService.isAuth()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Token invalid or already expired',
      })
      this.router.navigate(['/'])
      return false;
    }
    return true;
  }

}
