import { Component } from '@angular/core';
import { EntsalService } from 'src/app/services/entsal/entsal.service';

@Component({
  selector: 'app-list-ent-sal',
  templateUrl: './list-ent-sal.component.html',
  styleUrls: ['./list-ent-sal.component.css']
})
export class ListEntSalComponent {

  title = 'Entradas/Salidas Registradas';
  dtOptions:DataTables.Settings = {};
  listEntSal: any [] = [];
  idTransac: any | null;
  seleccion:any;

  constructor(private _entSalService:EntsalService) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      language:{ decimal: "", emptyTable: "No hay información", info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas", infoEmpty: "Mostrando 0 to 0 of 0 Entradas", infoFiltered: "(Filtrado de _MAX_ total entradas)", infoPostFix: "", thousands: ",", lengthMenu: "Mostrar _MENU_ Entradas", loadingRecords: "Cargando...", processing: "Procesando...", search: "Buscar:", zeroRecords: "Sin resultados encontrados", paginate:{ first: "Primero", last: "Ultimo", next: "Siguiente", previous: "Anterior" }
      }
    }
    this.getEntSal();
  }

  getEntSal(){
    this._entSalService.getsEntSal().subscribe(data => {
      this.listEntSal = data
    }, error => {
      console.log(error);
    })
  }

}
