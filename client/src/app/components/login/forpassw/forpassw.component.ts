import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from 'src/app/services/PasswordReset/password-reset.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forpassw',
  templateUrl: './forpassw.component.html',
  styleUrls: ['./forpassw.component.css']
})
export class ForpasswComponent implements OnInit {

  userForm:FormGroup = this.formBuilder.group({
    email:['',[Validators.required, Validators.email]]
  })
  submitted = false;
  constructor(private passwordResetService: PasswordResetService,private formBuilder:FormBuilder,     private toastr : ToastrService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.openLoad('show');
    this.submitted= true;
    const emailValue = this.userForm.get('email')?.value;
    if (emailValue !== undefined) {
      this.passwordResetService.sendPasswordResetEmail(emailValue).subscribe(
        response => {
          this.toastr.success('Se a enviado a su correo un restablecimiento de Contraseña', 'Bien');
          this.router.navigate(['/login']);
          this.openLoad('hidden');
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  openLoad(action:string){
    let showLoad:any = document.getElementById('load');
    switch (action) {
      case 'show':
        showLoad.classList.remove('loadClose');
        showLoad.classList.add('loadOpen');
      break;
      case 'hidden':
        showLoad.classList.remove('loadOpen');
        showLoad.classList.add('loadClose');
      break;
    }
  }
}
