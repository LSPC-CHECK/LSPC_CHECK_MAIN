import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router ,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateuserprofile',
  templateUrl: './updateuserprofile.component.html',
  styleUrls: ['./updateuserprofile.component.css']
})
export class UpdateuserprofileComponent implements OnInit {

  //se define la variable profileform como una instancia de la clase formGroup utilizando el servicio FormBuilder
  // este campo es obligartorio
  profileForm: FormGroup= this.formBuilder.group({
    name:['',Validators.required]
  });
  //se define la variable como false para indicar que el formulario no se han enviado todavia
    submitted=false;
  //se define el constructor del componente con los servicios necesarios para el funcionamiento
  constructor(
    private formBuilder:FormBuilder,
    private profileService: ProfileService,
    private router:Router,
    private activatedRouter:ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    //se obtiene el identificador del perfil de usuario que se va actualizar, por ejemplo, desde la URL de la pagina de update profile
    const profileId = this.activatedRouter.snapshot.params['id'];
    //se llama el metodo getProfile() del servicio ProfileService para obtener los datos del perfil de usuario que se va a actualizar.
    this.profileService.getProfile(profileId).subscribe({
      next:(response:any)=>{
        //se establece el valor del campo name con el nombre del perfil de usuario obtenido.
        this.profileForm.setValue({
          name: response.name
        });
      },
      error:(error:any) => {
        console.log(error);
      }
    })
  }

  //se define el metodo update, que se ejecuta cuando se actualiza el perfil de usuario
  onUpdate(): void{
    this.submitted = true;//se establece la variable submitted a true para indicar que el formulario se ha enviado
    //se comprueba si el formulario es valido (this.profileForm.valid).
    if(this.profileForm.valid){
      //se crea un objeto con el valor del campo name.
      const data = {
        name: this.profileForm.value.name
      };
      //se obtiene el identificador del perfil de usuario que se va actualizar, por ejemplo, desde la url de la pagina del perfil de usuario.
      const profileid=this.activatedRouter.snapshot.params['id'];

      //llamar el metodo updateprofile del servicio profileservice
      this.profileService.updateProfile(profileid,data).subscribe({
        next:(response:any)=>{
          //mostrar un mensaje de exito usando ToastrService
          this.toastr.info('Perfil actualizado correctamente!');
          //redigir al usuario a la pagina del perfil actualizado usando router
          this.router.navigate(['/userprofile']);
        },
        error:(error:any)=>{
          console.log(error);
          //mostrar  un mensaje de error usando ToastrService
          this.toastr.error('Ah ocurrido un error al actualizar el Perfil');

        }
      });
    }
  }

}
