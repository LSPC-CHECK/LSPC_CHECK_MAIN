import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ComputerService } from 'src/app/services/computer/computer.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-computer',
  templateUrl: './list-computer.component.html',
  styleUrls: ['./list-computer.component.css']
})
export class ListComputerComponent implements OnInit {

  listComputer:any[]=[];
  roles2:any [] = ['Administrador','Directivas','Auxiliar Administrativo','Usuario'];
  userRol:string;
  token = localStorage.getItem('token');
  data = this._userService.tknDecode(this.token);
  idUser = this.data.idUser
  rolUser = this.data.tbl_profile.name
  dtOptions:DataTables.Settings = {};

  constructor(private _computerService:ComputerService, private _userService:UserService, private toastr:ToastrService) {
    this.userRol = "";
  }
  ngOnInit(): void {
    this.dtOptions = {
      language:{ decimal: "", emptyTable: "No hay información", info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas", infoEmpty: "Mostrando 0 to 0 of 0 Entradas", infoFiltered: "(Filtrado de _MAX_ total entradas)", infoPostFix: "", thousands: ",", lengthMenu: "Mostrar _MENU_ Entradas", loadingRecords: "Cargando...", processing: "Procesando...", search: "Buscar:", zeroRecords: "Sin resultados encontrados", paginate:{ first: "Primero", last: "Ultimo", next: "Siguiente", previous: "Anterior" }
      }
    }
    this.getComputer();
  }

  getComputer(){
    this.userRol = this.rolUser
    if(this.userRol === this.roles2[0] || this.userRol === this.roles2[1] || this.userRol === this.roles2[2] ){
      this._computerService.getComputers().subscribe(data=>{
        this.listComputer = data;
      },error=>{
        console.log(error);
      });
    }else{
      this._computerService.getComputerByuserId(this.idUser).subscribe(data =>{
        this.listComputer = data;
      },error=>{
        console.log(error);
      });
    }
  }

  deleteComputer(idComputer:string){
    this._computerService.deleteComputer(idComputer).subscribe(data=>{
      this.toastr.warning('El computador fue eliminado','Eliminado');
      this.getComputer();
    },error=>{
      console.log(error);
    })
  }

}
