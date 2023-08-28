import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  listProfile:any[]=[];
  dtOptions:DataTables.Settings = {};

  constructor(private _profileServices:ProfileService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      language:{ decimal: "", emptyTable: "No hay información", info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas", infoEmpty: "Mostrando 0 to 0 of 0 Entradas", infoFiltered: "(Filtrado de _MAX_ total entradas)", infoPostFix: "", thousands: ",", lengthMenu: "Mostrar _MENU_ Entradas", loadingRecords: "Cargando...", processing: "Procesando...", search: "Buscar:", zeroRecords: "Sin resultados encontrados", paginate:{ first: "Primero", last: "Ultimo", next: "Siguiente", previous: "Anterior" }
      }
    }
    this.getProfile();
  }

  getProfile(){
    this._profileServices.getProfiles().subscribe(data =>{
    this.listProfile = data;
    },error=>{
      console.log(error);
    })
  }

  deleteProfile(idProfile:string){
    this._profileServices.deleteProfile(idProfile).subscribe(data=>{
      this.toastr.warning('El Perfil fue eliminado','Eliminado');
      this.getProfile();
    },error=>{
      console.log(error);
    })
  }
}
