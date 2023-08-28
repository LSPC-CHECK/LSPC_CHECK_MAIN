import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createuserprofile',
  templateUrl: './createuserprofile.component.html',
  styleUrls: ['./createuserprofile.component.css']
})
export class CreateuserprofileComponent implements OnInit {
  // se define la variable profileForm como una instancia de la clase FormGroup utilizando el servicio FormBuilder
  // este campo es obligatorio
  profileForm: FormGroup= this.formBuilder.group({
    name:['',Validators.required]
  });
  // se define la variable como false para indicar que el formulario no se ha enviado todavía
  submitted = false;

  // se define el constructor del componente con los servicios necesarios para su funcionamiento
  constructor(private formBuilder: FormBuilder,private profileService: ProfileService,private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {}

  // se define el método onSubmit(), que se ejecuta cuando se envía el formulario.
  onSubmit(): void {
    this.submitted = true; // se establece la variable submitted a true para indicar que el formulario se ha enviado.
    // se comprueba si el formulario es válido (this.profileForm.valid).
    if (this.profileForm.valid) {
      // se crea un objeto data con el valor del campo name.
      const data = {
        name: this.profileForm.value.name
      };
      // se llama al método addProfile() del servicio ProfileService para crear un nuevo perfil de usuario.
      this.profileService.addProfile(data).subscribe({
        next: (response: any) => {
          console.log(response);
          // se muestra un mensaje de notificación si la operación es exitosa y se redirige al usuario a la página de perfiles de usuario.
          this.toastr.success('Perfil Creado', 'Completado');
          this.router.navigate(['/userprofile']);
        },
        error: (error: any) => {
          console.log(error);
          // se muestra un mensaje de notificación si la operación es fallida.
          this.toastr.error('Fallo al crear el Perfil', 'Error');
        }
      });
    }
  }
}
