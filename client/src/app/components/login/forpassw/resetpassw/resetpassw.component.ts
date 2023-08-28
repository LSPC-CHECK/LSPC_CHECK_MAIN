import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from 'src/app/services/PasswordReset/password-reset.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-resetpassw',
  templateUrl: './resetpassw.component.html',
  styleUrls: ['./resetpassw.component.css']
})
export class ResetpasswComponent implements OnInit {

  show:any;
  userForm:FormGroup = this.formBuilder.group({
    resetPasswordToken:['',Validators.required],
    newpassword:['',Validators.required],
    confirmPassword:['',Validators.required],
  });
  submitted = false;
  isTokenValid = false;

  constructor(private route:ActivatedRoute, private toastr:ToastrService, private router:Router,private formBuilder:FormBuilder,  private passwordResetService:PasswordResetService) { }

  ngOnInit(): void {
    const resetPasswordToken  = this.route.snapshot.paramMap.get('resetPasswordToken');
    this.userForm.setValue({
      resetPasswordToken:resetPasswordToken,
      newpassword:'',
      confirmPassword:'',
    });

  }

  checkPasswords(){
    const newpassword = this.userForm.get('newpassword')?.value;
    const confirmPassword = this.userForm.get('confirmPassword')?.value;

    return newpassword === confirmPassword? null:{notSame:true}
  }

  onSubmit():void{
    if (this.checkPasswords()) {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }

    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    const user:User = {
      resetPasswordToken : this.userForm.value.resetPasswordToken,
      password:this.userForm.value.newpassword
    };

    this.passwordResetService.resetPassword(user).subscribe(
      (response)=>{
        console.log(response);
        this.toastr.success('Se Actualizado su contraseña correctamente', 'Bien');
        this.router.navigate(['/login'])
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  showPass(){
    this.show = !this.show
  }
}
