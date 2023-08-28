import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  //se define la variable userForm como una instancia de la clase formGroup utilizando el servicio formBuilder
  //este campo es obligatorio
  userForm:FormGroup = this.formBuilder.group({
    name:['',Validators.required],
    lastname:['',Validators.required],
    password:['',Validators.required],
    email:['',Validators.required],
    cardId:['',Validators.required],
    idProfile:['',Validators.required],
    state:['',Validators.required],
  })
  //se define la variable como false para indicar que el formulario no  se a enviado
  submitted = false;
  state : any[]=[
    'Activo',
    'Inactivo'
  ];
  profile: any[]=[]; //Define la propiedad 'profile' como un arrary vacio
  //se define el constructor del componente con los servicios necesarios para su funcionamiento
  constructor(
    private userService:UserService,
    private profileService: ProfileService,
    private formBuilder:FormBuilder,
    private toastr : ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.profileService.getProfiles().subscribe(
      (data)=>{
        this.profile = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }
// se define el método onSubmit(), que se ejecuta cuando se envía el formulario.
  onSumbit():void{
    this.submitted= true;// se establece la variable submitted a true para indicar que el formulario se ha enviado.
    // se comprueba si el formulario es válido (this.userForm.valid).
    if(this.userForm.valid){
      const data = {
        name:this.userForm.value.name,
        lastname:this.userForm.value.lastname,
        password:this.userForm.value.password,
        email:this.userForm.value.email,
        cardId:this.userForm.value.cardId,
        idProfile:this.userForm.value.idProfile,
        state:this.userForm.value.state,
      };
     //se llama al metodo addUser() del servicio userService para crear un nuevo registro de usuario
    this.userService.addUser(data).subscribe({
      next:(response:any)=>{
        console.log(response);
        //se muestra un mensaje de notificacion si la operacion es exitosa
        this.toastr.success('Usuario creado correctamente', 'Bien');
        this.router.navigate(['/list-users']);
      },
      error:(error:any)=>{
        console.log(error);
        //se muestra un mensaje de notificacion si la operacion es fallida
        this.toastr.error('Fallo al crear el usuario', 'Error');
      }
    })
    }


  }

}
