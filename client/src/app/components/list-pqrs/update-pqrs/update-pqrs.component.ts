import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PqrsService } from 'src/app/services/pqrs/pqrs.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-pqrs',
  templateUrl: './update-pqrs.component.html',
  styleUrls: ['./update-pqrs.component.css']
})
export class UpdatePqrsComponent implements OnInit {

  idInform: any | null;
  pqrsForm: FormGroup;
  token = localStorage.getItem('token');

  constructor(private toastr: ToastrService, private _pqrsService: PqrsService, private fb: FormBuilder, private router: Router, private aRoute: ActivatedRoute) {
    this.pqrsForm = this.fb.group({
      reason:['', Validators.required],
      description:['', Validators.required],
      date:['', Validators.required],
      time:['', Validators.required],
      tipoTransac:['', Validators.required],
    })
    this.idInform = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  updatePqrs(){
    const PQRS: any = {
      reason: this.pqrsForm.get('reason')?.value,
      description: this.pqrsForm.get('description')?.value,
      date: this.pqrsForm.get('date')?.value,
      time: this.pqrsForm.get('time')?.value,
      tipoTransac: this.pqrsForm.get('tipoTransac')?.value
    }
    if(this.idInform !== null){
      // Actualizar una PQRS por ID
    this._pqrsService.updatePqrs(this.idInform, PQRS).subscribe(data => {
      this.toastr.info('PQRS ha sido actualizada', 'Actualizado Exitosamente')
      this.router.navigate(['/list-pqrs']);
    }, error => {
      this.toastr.error('La PQRS no ha podido actualizar', 'Error');
      this.pqrsForm.reset(1);
    });
    }else{
      this.router.navigate(['/list-pqrs'])
    }
  }
  esEditar(){
    if (this.idInform !== null) {
      this._pqrsService.getsPqrs(this.idInform).subscribe(data =>{
        this.pqrsForm.setValue({
          reason: data.reason,
          description: data.description,
          tipoTransac: data.tipoTransac,
          date: data.date,
          time: data.time
        })
      })
    }
  }
  PqrsForm(action: string){
    switch (action) {
      case 'open':
        document.getElementById('add-pqrs')?.classList.remove('add-pqrs-inactivo');
        document.getElementById('add-pqrs')?.classList.add('add-pqrs-activo');
        break;
      case 'close':
        document.getElementById('add-pqrs')?.classList.remove('add-pqrs-activo');
        document.getElementById('add-pqrs')?.classList.add('add-pqrs-inactivo');
        break;
    }
  }
}
