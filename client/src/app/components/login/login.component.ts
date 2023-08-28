import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  show:any;
  userForm: FormGroup;
  idUser: any | null;

  constructor(private _userService: UserService, private fb: FormBuilder, private toastr: ToastrService, private router: Router, private aRoute: ActivatedRoute){
        this.userForm = this.fb.group({
          name: ['', Validators.required],
          lastName:['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          cardId: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
          state: ['Activo',Validators.required],
          idProfile: [4, Validators.required],
          password: ['', Validators.required]
        });
        this.idUser = this.aRoute.snapshot.paramMap.get('id');
      }

  ngOnInit(): void {
    localStorage.removeItem('token');
  }

  addUser(){
    // Datos del usuario a enviar al backendz
    const USER : any = {
      name: this.userForm.get('name')?.value,
      password: this.userForm.get('password')?.value,
      email: this.userForm.get('email')?.value,
      cardId: this.userForm.get('cardId')?.value,
      lastname: this.userForm.get('lastName')?.value,
      idProfile: this.userForm.get('idProfile')?.value,
      state: this.userForm.get('state')?.value
    }
    if(this.idUser !== null){
      // Actializar un registro or ID
      this._userService.updateUser(this.idUser, USER).subscribe(data =>{
        this.toastr.info('User has been updated', 'Successfully Updated')
        this.router.navigate(['/list-users'])
      }, error => {
        this.toastr.error('User could not be updated','Error');
        this.userForm.reset(1);
      })
    }else{
      // Guardar un registro nuevo
      this._userService.addUser(USER).subscribe(data =>{
        this.toastr.success('Registro realizado con exito', 'Registrado')
        this.userForm.reset(1);
        this.router.navigate(['/login'])
      }, error => {
        this.toastr.error('El usuario no pudo ser registrado','Error');
        this.userForm.reset(1);
      })
    }
  }

  login(): void{
    const USUARIO: any = {
      cardId: this.userForm.get('cardId')?.value,
      password: this.userForm.get('password')?.value
    }
    this._userService.login(USUARIO).subscribe(data => {
      localStorage.setItem('token', data.token)
      this.router.navigate(['/home'])
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido!',
        text: 'Logueado correctamente',
      })
    }, error =>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Documento o contraseña inválidos, o perfil inactivo',
      })
      return false;
    })
  }

  container={
    'right-panel-active':true
  };
  loginButton() {
    this.container['right-panel-active']=false;
  }
  registerButton() {
    this.container['right-panel-active']=true;
  }

  showPass(){
    this.show = !this.show
  }
}
