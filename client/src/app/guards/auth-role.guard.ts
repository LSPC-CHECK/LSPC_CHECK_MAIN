import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { ProfileService } from '../services/profile/profile.service';
import { UserService } from '../services/user/user.service';
import { DataHistoryComponent } from '../components/data-history/data-history.component';
import { QrcheckComponent } from '../components/qrcheck/qrcheck.component';
import { UserprofileComponent } from '../components/userprofile/userprofile.component';
import { CreateuserprofileComponent } from '../components/userprofile/createuserprofile/createuserprofile.component';
import { UpdateuserprofileComponent } from '../components/userprofile/updateuserprofile/updateuserprofile.component';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {


  constructor(private router:Router, private _profileService: ProfileService, private _userService: UserService) {}

  canActivate(route:ActivatedRouteSnapshot):boolean{
    //decodificar e informacion del token
    let user:any = this._userService.tknDecode(localStorage.getItem('token'));
    //sacar el rol que tiene el usuario
    let rolUser = user.tbl_profile.name
    //segun el rol del usuario se ejecuta una accion
    switch (rolUser) {
    //validacion de permisos segun rol
      case 'Administrador':
        return true;
      break;
      case 'Directivas':

        if( route.component === DataHistoryComponent || route.component === QrcheckComponent || route.component === UserprofileComponent || route.component === CreateuserprofileComponent || route.component === UpdateuserprofileComponent ){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes los permisos necesarios, eres Directiva',
          });
          this.router.navigate(['home']);
          return false
        }else{
          return true
        }
      break;
      case 'Auxiliar Administrativo':
        if( route.component === QrcheckComponent || route.component === UserprofileComponent || route.component === CreateuserprofileComponent || route.component === UpdateuserprofileComponent  ){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes los permisos necesarios, eres Auxiliar'
          });
          this.router.navigate(['home']);
          return false
        }else{
          return true
        }
      break;
      default:
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No tienes los permisos suficientes, eres usuario'
        });
        this.router.navigate(['home']);
        return false
      break;
    }
  }
}
