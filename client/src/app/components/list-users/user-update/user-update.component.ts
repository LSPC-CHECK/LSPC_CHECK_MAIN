import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
// Definición del formulario y los campos que este contiene
  userForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    cardId: ['', Validators.required],
    idProfile: ['', Validators.required],
    state: ['', Validators.required],
  });

  submitted = false;
  state: any[] = [
    'Activo',
    'Inactivo'
  ];
  profile: any[] = [];

  constructor(
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const userId = this.activatedRouter.snapshot.params['id'];
    // Obtención del usuario a actualizar
    this.userService.getUser(userId).subscribe({
      next: (response: any) => {
        this.userForm.setValue({
          name: response.name,
          lastname: response.lastname,
          email: response.email,
          cardId: response.cardId,
          idProfile: response.idProfile,
          state: response.state,
        })
      }
    });
// Obtención de los perfiles de usuario
    this.profileService.getProfiles().subscribe(
      (data) => {
        this.profile = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onUpdate(): void {
    this.submitted = true;

    if (this.userForm.valid) {
      const userId = this.activatedRouter.snapshot.params['id'];
      const data = {
        name: this.userForm.value.name,
        lastname: this.userForm.value.lastname,
        email: this.userForm.value.email,
        cardId: this.userForm.value.cardId,
        idProfile: this.userForm.value.idProfile,
        state: this.userForm.value.state,
      };
      // Actualización del usuario
      this.userService.updateUser(userId, data).subscribe({
        next: (response: any) => {
          this.toastr.info('Usuario actualizado exitosamente');
          this.router.navigate(['/list-users']);
        },
        error: (err: any) => {
          this.toastr.error('Error al actualizar el usuario');
        }
      });
    }
  }

}
