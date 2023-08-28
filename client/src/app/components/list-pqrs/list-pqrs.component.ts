import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pqrs } from 'src/app/models/Pqrs';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { PqrsService } from 'src/app/services/pqrs/pqrs.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pqrs',
  templateUrl: './list-pqrs.component.html',
  styleUrls: ['./list-pqrs.component.css']
})
export class ListPqrsComponent implements OnInit {

  listPqrs:any [] = [];
  pqrsForm: FormGroup;
  idInform: any | null;
  idUser: any | null;
  token = localStorage.getItem('token');
  roles:any [] = this._profileService.getRoles();
  userRol:string;
  data = this._userService.tknDecode(this.token);
  roles2:any [] = ['Administrador','Directivas','Auxiliar Administrativo','Usuario'];
  dtOptions:DataTables.Settings = {};


  constructor(private toastr: ToastrService, private _profileService:ProfileService, private _userService: UserService, private _pqrsService: PqrsService, private fb: FormBuilder, private router: Router, private aRoute: ActivatedRoute) {
    this.pqrsForm = this.fb.group({
      reason:['', Validators.required],
      description:['', Validators.required],
      date:['', Validators.required],
      time:['', Validators.required],
      tipoTransac:['', Validators.required],
    });
    this.userRol = "";
    this.idInform = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.dtOptions = {
      language:{ decimal: "", emptyTable: "No hay información", info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas", infoEmpty: "Mostrando 0 to 0 of 0 Entradas", infoFiltered: "(Filtrado de _MAX_ total entradas)", infoPostFix: "", thousands: ",", lengthMenu: "Mostrar _MENU_ Entradas", loadingRecords: "Cargando...", processing: "Procesando...", search: "Buscar:", zeroRecords: "Sin resultados encontrados", paginate:{ first: "Primero", last: "Ultimo", next: "Siguiente", previous: "Anterior" }
      }
    }
    this.getsPqrs();
  }
  getsPqrs(){
    this.userRol = this.data.tbl_profile.name;
    if(this.userRol === this.roles2[0] || this.userRol === this.roles2[1] || this.userRol === this.roles2[2] ){
      this._pqrsService.getPqrs().subscribe(data => {
        this.listPqrs = data;
        }, error => {
          console.log(error);
        })
    }else{
      this._pqrsService.getPqrsByUser().subscribe(res=>{
        this.listPqrs = res
      },error =>{
        console.log(error);
      });
    }
  }


  addPqrs(){
    let data = this._userService.tknDecode(this.token);
    const PQRS: Pqrs = {
      idUser: data.idUser,
      reason: this.pqrsForm.get('reason')?.value,
      description: this.pqrsForm.get('description')?.value,
      date: this.pqrsForm.get('date')?.value,
      time: this.pqrsForm.get('time')?.value,
      tipoTransac: this.pqrsForm.get('tipoTransac')?.value
    }
    if(this.idInform !== null){
      // Actualizar una PQRS por ID
      this.router.navigate(['/update-pqrs']);
    } else{
      // Crear o Guardar una PQRS nueva
      this._pqrsService.addPqrs(PQRS).subscribe(data => {
        this.pqrsForm.reset();
        this.toastr.success('La PQRS ha sido creada con éxito');
        this.PqrsForm('close');
        this.getsPqrs();
      }, error => {
        this.toastr.error('No se pudo crear la PQRS');
        this.pqrsForm.reset();
      });
    }
  }
  PqrsForm(action: string){
    switch (action) {
      case 'open':
        document.getElementById('add-pqrs')?.classList.remove('add-pqrs-inactivo');
        document.getElementById('add-pqrs')?.classList.add('add-pqrs-activo');
        break;
      case 'close':
        document.getElementById('add-pqrs')?.classList.remove('add-pqrs-activo');
        document.getElementById('add-pqrs')?.classList.add('add-pqrs-inactivo');
        break;
    }
  }
}
