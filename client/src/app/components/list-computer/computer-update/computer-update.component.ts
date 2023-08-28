import { Component, OnInit } from '@angular/core';
import { ComputerService } from 'src/app/services/computer/computer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-computer-update',
  templateUrl: './computer-update.component.html',
  styleUrls: ['./computer-update.component.css']
})
export class ComputerUpdateComponent implements OnInit {
  idUser:string;
  name:string;
  lastName:string;
  // se define la variable computerForm como una instancia de la clase FormGroup utilizando el servicio FormBuilder
  // este campo es obligatorio
  computerForm:FormGroup = this.formBuilder.group({
    idSerial:['',Validators.required],
    color:['',Validators.required],
    mark:['',Validators.required],
    peripherals:['',Validators.required],
    idUser:['',Validators.required],
  })
    // se define la variable como false para indicar que el formulario no se ha enviado todavía
    submitted = false;

    // se define el constructor del componente con los servicios necesarios para su funcionamiento
  constructor(private computerService:ComputerService,private activatedRouter:ActivatedRoute,private UserService:UserService,private formBuilder:FormBuilder,private router:Router,private toastr:ToastrService ) {
    this.idUser ='';
    this.name = '';
    this.lastName =  '';
  }

  ngOnInit(): void {
  //se obtiene el id del computer que se va actualizar
    const computerId = this.activatedRouter.snapshot.params['id'];
    //se llama el metodo getComputer() del servicio computerService para obtener los datos del computer

    this.computerService.getComputer(computerId).subscribe({
      next:(response:any)=>{
        //se establece el valor del campo obtenido.
        this.computerForm.setValue({
          idSerial : response.idSerial,
          color: response.color,
          mark: response.mark,
          peripherals: response.peripherals,
          idUser: response.idUser
        })
        this.idUser = response.idUser;
        this.name = response.tbl_user.name;
        this.lastName = response.tbl_user.lastname;
      }
    });
  }

  //se define el metodo update
  onUpdate():void{
    this.submitted = true;//se establece la variable
    //se comprueba si el formulario es valido

    if(this.computerForm.valid){
      const data = {
        idSerial:this.computerForm.value.idSerial,
        color:this.computerForm.value.color,
        mark:this.computerForm.value.mark,
        peripherals:this.computerForm.value.peripherals,
        idUser:this.computerForm.value.idUser,
      };

      const computerid= this.activatedRouter.snapshot.params['id'];

      //llamar el metodo updateComputer del servicio computer
      this.computerService.updateComputer(computerid,data).subscribe({
        next:(response:any)=>{
          //mostar mensaje de exito
          this.toastr.info('Computador Actualizado correctamente!');

          //redigir al usuario a la pagina
          this.router.navigate(['/list-computers']);
        },
        error:(error:any)=>{
          console.log(error);
          //mostrar un mensaje de error usando toastr
          this.toastr.error('Ah ocurrido un error al actualizar el computador');
        }
      })
    }
  }
}
