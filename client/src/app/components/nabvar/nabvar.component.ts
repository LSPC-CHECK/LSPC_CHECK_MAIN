import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent implements OnInit {

  idUser:any;
  userName:string;
  token = localStorage.getItem('token');
  roles:any [] = this._profileService.getRoles();
  userRol:string;

  constructor(private router: Router, private _userService:UserService, private _profileService:ProfileService) {
    this.userName = "";
    this.userRol = "";
  }

  ngOnInit(): void {
    this.tokenInf();
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }

  tokenInf(){
    let data = this._userService.tknDecode(this.token);
    this.userName = data.name;
    this.userRol = data.tbl_profile.name;
    this.idUser = data.idUser;
  }

}
