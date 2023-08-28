import { UserService } from '../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  listUsers:any [] = [];
  rols: any[] = this._profileService.getRoles();
  dtOptions:DataTables.Settings = {};

  constructor(private _userService: UserService,
              private toastr: ToastrService,
              private _profileService: ProfileService) { }

  ngOnInit(): void {
    this.dtOptions = {
      language:{ decimal: "", emptyTable: "No hay información", info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas", infoEmpty: "Mostrando 0 to 0 of 0 Entradas", infoFiltered: "(Filtrado de _MAX_ total entradas)", infoPostFix: "", thousands: ",", lengthMenu: "Mostrar _MENU_ Entradas", loadingRecords: "Cargando...", processing: "Procesando...", search: "Buscar:", zeroRecords: "Sin resultados encontrados", paginate:{ first: "Primero", last: "Ultimo", next: "Siguiente", previous: "Anterior" }
      }
    }
    this.getUsers();
  }
  getUsers(){
    this._userService.getUsers().subscribe(data => {
    this.listUsers = data;
    }, error => {
      console.log(error);
    })
  }
  deleteUser(idUser: string){
    this._userService.deleteUser(idUser).subscribe(data => {
      this.toastr.warning('El usuario fue eliminado correctamente','Eliminado');
      this.getUsers();
    }, error => {
      console.log(error);
    })
  }
}
