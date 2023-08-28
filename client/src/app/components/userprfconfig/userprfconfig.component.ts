import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import * as bcrypt from 'bcryptjs';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-userprfconfig',
  templateUrl: './userprfconfig.component.html',
  styleUrls: ['./userprfconfig.component.css']
})
export class UserprfconfigComponent implements OnInit {

  show:any;
  userPForm: FormGroup;
  passForm: FormGroup;
  IdUser = this.activateRoute.snapshot.params['id'];
  url = `https://lspc-check.github.io/LSPC-CHECK/qrcheck/${this.IdUser}`;
  URL:SafeUrl = "";
  image ='';
  imgURL = 'https://i.ibb.co/fvd9MXW/logo-LSPC2.png';
  imageBlobUrl: string = '';

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router, private activateRoute: ActivatedRoute, private toastr: ToastrService ) {
    //Se inicializa y se llena el formulario de los datos del usuario.
    this.userPForm = this.fb.group({
      name:['', Validators.required],
      secName:[''],
      lastName:['', Validators.required],
      secSurname:[''],
      email:['', Validators.required],
      cardId:['', Validators.required],
    });

    //Se inicializa y se llena el formulario que me pide la contraseña.
    this.passForm = this.fb.group({
      password:['', Validators.required]
    });
  }

  ngOnInit(): void {
    //Se llama el id del usuario que esta en el url.
    this.IdUser = this.activateRoute.snapshot.params['id'];
    //Se llama toda la informacion del usuario que hay en base de datos y se asigna al formulario del usuario.
    this._userService.getUser(this.IdUser).subscribe({
      next:(data:any)=>{
        this.userPForm.setValue({
          name: data.name,
          secName: data.secName,
          lastName: data.lastname,
          secSurname: data.secSurname,
          email: data.email,
          cardId: data.cardId
        });
      },error:(error:any) => {
        console.log(error);
      }
    });
    //Se llama la funcion que me muestra la imagen seleccionada en el input de archivos.
    // this.getUserImage();
  }

  //Funcion para validar si la contraseña es correcta.
  updateProfile(){
    //Se llama la informacion de el token para sacar la contraseña.
    let passUser = this._userService.tknDecode(localStorage.getItem('token'));
    //Se saca la contraseña del token.
    passUser = passUser.password
    //Se compara si son iguales las contraseñas.
    if(bcrypt.compareSync(this.passForm.value.password,passUser))
    {
      //Se llaman las funciones para actualizar, cerrar la ventana emergente y resetear el formulario de la contraseña.
      this.update();
      this.decline();
      this.passForm.reset();
    }else
    {
      this.toastr.error('Contraseña incorrecta, intenta de nuevo');
    }
  }

  //Funcion para mostrar la ventana emergente del formulario de la contraseña.
  confirm(){
    let passFormApear:any = document.getElementById('passform');
    passFormApear.classList.remove('desapear');
    passFormApear.classList.add('apear');
  }

  //Funcion para cerrar y resetear el formulario que pide la contraseña.
  decline(){
    let passFormApear:any = document.getElementById('passform');
    passFormApear.classList.remove('apear');
    passFormApear.classList.add('desapear');
    this.passForm.reset();
  }

  //Funcion que me permite actualizar el usuario en cuestion.
  update(){
    //Se comprueba si el formulario es valido (this.userPForm.valid).
    if(this.userPForm.valid){
      //Se crea un objeto con el valor de los campos.
      const data:any = {
        name: this.userPForm.value.name,
        secName: this.userPForm.value.secName,
        lastName: this.userPForm.value.lastName,
        secSurname: this.userPForm.value.secSurname,
        password: this.passForm.value.password,
        email: this.userPForm.value.email,
        cardId: this.userPForm.value.cardId
      };
      //Se obtiene el identificador del usuario que se va actualizar.
      const UserId=this.activateRoute.snapshot.params['id'];
      //Llamar el metodo updateUser del servicio _userService
      this._userService.updateUser(UserId,data).subscribe({
        next:(response:any)=>{
          //Mostrar  un mensaje de exito usando ToastrService
          this.toastr.success('Usuario actualizado correctamente!');
          this.toastr.info('¡Ten en cuenta que debes reiniciar tu sesión para que se apliquen los cambios!');
        },
        error:(error:any)=>{
          console.log(error);
          //Mostrar  un mensaje de error usando ToastrService
          this.toastr.error('Ah ocurrido un error al actualizar el Usuario');
        }
      });
      //Llama la funcion para mandar la imagen a la base de datos.
      // this.setSelectImage();
    }
  }

  //Funcion para descargar el Codigo QR.
  onCodeChange(URL: SafeUrl){
    this.URL = URL;
  }

  //Funcion que me setea la imagen que selecciono en tiempo real.
  // selectImage(event:any){
  //   //Se valida si hay algun archivo en el input.
  //   if(event.target.files.length > 0)
  //   {
  //     //Se pasa el archivo del input a una variable.
  //     const file = event.target.files[0];
  //     //Se instancia una clase propia de JavaScript/Angular.
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);//se lee el archivo que tenemos que se almacena en la memoria local.
  //     //Se asigna la imagen resultante a una variable para ser mostrada en el front.
  //     reader.onload = (event:any)=>{
  //       this.imgURL = event.target.result;
  //     }
  //     //Se asigna la imagen completa a otra variable para ser enviada a la DB/API.
  //     this.image = file;
  //   }
  // }

  //Funcion para enviar la imagen a la DB/API.
  // setSelectImage(){
  //   //Se instancia una clase propia de Angular.
  //   const imgData = new FormData();
  //   //Se añade al formulario el tipo de lo que se va a enviar y el archivo a enviar.
  //   imgData.append('file',this.image);
  //   //Se llama la funcion updateImageUser para enviar la imagen a la API.
  //   this._userService.updateImageUser(this.IdUser,imgData).subscribe({
  //     next:(response: any)=>{},
  //     error:(error:any)=>{
  //       console.log(error);
  //     }
  //   });
  // }

  //Funcion para extraer la imagen desde la DB.
  // getUserImage(){
  //   this._userService.getImageUser(this.IdUser).subscribe((image:any)=>{
  //     //crear una url para mostrar la imagen
  //     const blob = new Blob([image.data],{type:image.type});
  //     this.imageBlobUrl = URL.createObjectURL(blob);
  //   });
  // }

  showPass(){
    this.show = !this.show
  }


}
