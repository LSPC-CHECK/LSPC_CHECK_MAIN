import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rol = "";
  userName:string;
  secUserName:string;
  lastName:string;
  secSurName:string;
  token = localStorage.getItem('token');
  rols:any [] = this._profileService.getRoles();

  constructor(private _userService: UserService, private _profileService: ProfileService) {
    this.userName = "";
    this.secUserName = "";
    this.lastName = "";
    this.secSurName = "";
  }

  ngOnInit(): void {
    this.tokenInf();
  }

  tokenInf(){
    let data = this._userService.tknDecode(this.token);
    this.userName = data.name;
    this.secUserName = data.secName;
    this.lastName = data.lastname;
    this.secSurName = data.secSurname;
    this.rol = data.tbl_profile.name;
  }

}
