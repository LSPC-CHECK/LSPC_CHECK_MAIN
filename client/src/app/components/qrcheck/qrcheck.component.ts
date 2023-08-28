import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntsalService } from 'src/app/services/entsal/entsal.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-qrcheck',
  templateUrl: './qrcheck.component.html',
  styleUrls: ['./qrcheck.component.css']
})
export class QrcheckComponent implements OnInit {

  submitted:boolean = false;
  computers:any[]=[];
  QrForm:FormGroup = this.fb.group({
    user:['',Validators.required],
    idComputer:['',Validators.required],
    tipoTransac:['',Validators.required]
  })

  constructor(private fb:FormBuilder, private activatedRouter:ActivatedRoute, private _EntSalService:EntsalService, private _userService:UserService, private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    const userId = this.activatedRouter.snapshot.params['id'];
    this._userService.getUser(userId).subscribe({
      next:(res)=>{
        this.QrForm.setValue({
          user: res.name+' '+res.lastname,
          idComputer: '',
          tipoTransac: '',
        });
        this.computers = res.tbl_computers;
      }
    });
  }

  onSubmit(){
    if(this.QrForm.valid){
      const transac = {
        idUser:this.activatedRouter.snapshot.params['id'],
        idComputer: this.QrForm.value.idComputer,
        time: this.formatedTime(),
        date: this.formatedDate(),
        tipoTransac: this.QrForm.value.tipoTransac
      }
      this._EntSalService.postEntSal(transac).subscribe({
        next:(res)=>{
          this.toastr.success(`${this.QrForm.value.tipoTransac} registrada correctamente!`);
          this.router.navigate(['/list-ent-sal']);
        },error:(error:any) =>{
          this.toastr.error(`Error al registrar la ${this.QrForm.value.tipoTransac}`);
          this.router.navigate(['/list-ent-sal']);
        }
      })

    }
  }

  num2digits(num:number){
    return num.toString().padStart(2, '0');
  }

  formatedDate(){
    let date = new Date()
    return [
      date.getFullYear(),
      this.num2digits(date.getMonth()+1),
      this.num2digits(date.getDate())
    ].join('/');
  }

  formatedTime(){
    let date = new Date();
    return[
      this.num2digits(date.getHours()),
      this.num2digits(date.getMinutes()),
      this.num2digits(date.getSeconds())
    ].join(':')
  }

}
