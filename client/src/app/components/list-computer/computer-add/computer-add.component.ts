import { Component, OnInit } from '@angular/core';
import { ComputerService } from 'src/app/services/computer/computer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
@Component({
  selector: 'app-computer-add',
  templateUrl: './computer-add.component.html',
  styleUrls: ['./computer-add.component.css']
})
export class ComputerAddComponent implements OnInit {

  token = localStorage.getItem('token');
  roles:any [] = this._profileService.getRoles();
  userRol:string;
  idUser:string;

  // se define la variable profileForm como una instancia de la clase FormGroup utilizando el servicio FormBuilder
  // este campo es obligatorio
  computerForm:FormGroup;
  // se define la variable como false para indicar que el formulario no se ha enviado todavía
  submitted = false;

  users: any[] = []; // Define la propiedad 'users' como un array vacío

  // se define el constructor del componente con los servicios necesarios para su funcionamiento
  constructor(private computerService:ComputerService, private _profileService:ProfileService,private UserService:UserService, private formBuilder:FormBuilder, private router:Router, private toastr:ToastrService) {
    let data = this.UserService.tknDecode(this.token);
    this.userRol = data.tbl_profile.name;
    this.idUser = data.idUser;

    if(this.userRol === 'Usuario'){
      this.computerForm = this.formBuilder.group({
        idSerial:['',Validators.required],
        color:['',Validators.required],
        mark:['',Validators.required],
        peripherals:['',Validators.required],
        idUser:[this.idUser,Validators.required],
      });
    }else{
      this.computerForm = this.formBuilder.group({
        idSerial:['',Validators.required],
        color:['',Validators.required],
        mark:['',Validators.required],
        peripherals:['',Validators.required],
        idUser:['',Validators.required],
      })
    }
  }

  ngOnInit(): void {
    this.UserService.getUsers().subscribe(
      (data)=>{
        this.users = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  // se define el método onSubmit(), que se ejecuta cuando se envía el formulario.
  onSubmit():void{
    this.submitted = true;// se establece la variable submitted a true para indicar que el formulario se ha enviado.
    // se comprueba si el formulario es válido (this.computerForm.valid).
    if(this.computerForm.valid){
      // se crea un objeto data con el valor del campo name.
      const data = {
        idSerial:this.computerForm.value.idSerial,
        color:this.computerForm.value.color,
        mark:this.computerForm.value.mark,
        peripherals:this.computerForm.value.peripherals,
        idUser:this.computerForm.value.idUser,
      };
      // se llama al método addComputer() del servicio ProfileService para crear un nuevo perfil de usuario.
      this.computerService.addComputer(data).subscribe({
        next:(response:any)=>{
            // se muestra un mensaje de notificación si la operación es exitosa y se redirige al usuario a la página de perfiles de usuario.
            this.toastr.success('El computador fue agregado', 'Bien');
            this.router.navigate(['/list-computers']);
        },
        error:(error:any)=>{
          console.log(error);
            // se muestra un mensaje de notificación si la operación es fallida.
            this.toastr.error('Fallo al agregar el computador', 'Error');
        }
      });
    }
  }
}
