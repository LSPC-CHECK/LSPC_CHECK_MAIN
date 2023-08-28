import { Component, OnInit } from '@angular/core';
import { CountsService } from 'src/app/services/counts/counts.service';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Component({
  selector: 'app-data-history',
  templateUrl: './data-history.component.html',
  styleUrls: ['./data-history.component.css']
})
export class DataHistoryComponent implements OnInit {

  multi:any[]=[];
  //opciones de la grafica
  legend: boolean = false;
  xAxis:boolean = true;
  yAxis:boolean = true;
  showYAxisLabel:boolean = false;
  showXAxisLabel:boolean = false;
  xAxisLabel:string = 'Datos';
  yAxisLabel:string = 'Cantidad';
  timeLine:boolean = true;
  Entradas:number=0;
  Date:Date = new Date();
  fecha:any;
  gradient:boolean = true;
  DATA: HTMLElement | any;
  dataContent:any[]=[];

  constructor(private _countService:CountsService, private toastr: ToastrService) {
    this._countService.getCountEntSal().subscribe(data=>{
      let salidas:number = data.salidas[0].n_salidas
      let entradas:number = data.entradas[0].n_entradas
      this._countService.getCountUsers().subscribe(data=>{
        let users:number = data[0].n_users
        this._countService.getCountProfile().subscribe(data=>{
          let profiles:number = data[0].n_profiles
          this._countService.getCountComputers().subscribe(data=>{
            let computers:number = data[0].n_pcs
            this._countService.getCountPqrs().subscribe(data=>{
              let pqrs:number = data[0].n_pqrs
              this.multi = [
                {"name":"Entradas","value":entradas},
                {"name":"Salidas","value":salidas},
                {"name":"Usuarios","value":users},
                {"name":"Perfiles","value":profiles},
                {"name":"Computadores","value":computers},
                {"name":"Pqrs","value":pqrs}
              ];
              this.dataContent = [{entradas,salidas,users,profiles,computers,pqrs}];
            });
          });
        });
      });
    });
  }

  ngOnInit(): void {
    this.fecha = this.Date.getDate() + '/'+(this.Date.getMonth()+1) +'/'+this.Date.getFullYear()
  }

  async download(){
    this.openLoad('show')
    try {
      this.DATA = document.getElementById('historial');

      const canvas = await html2canvas(this.DATA,{ scale:2 });
      const imgData = canvas.toDataURL('image/png');
      const docDefinition:TDocumentDefinitions  = {
        pageSize:{
          width: 595.28,
          height: 'auto'
        },
        content:[
          {
            image: imgData,
            width: 595.28,
            height: 250
          }
        ],
        pageMargins:5,
      }

      pdfMake.createPdf(docDefinition).download(`${this.fecha}_Informe_LSPC-CKECK_`);

      this.toastr.info('PDF Generado Correctamente', 'Bien!');
      this.openLoad('hidden');
    } catch (error) {
      this.toastr.error('Error al Generar el PDF');
    }

  }

  openLoad(action:string){
    let showLoad:any = document.getElementById('load');
    let showTable:any = document.getElementById('contentTable');
    let showGrafica:any = document.getElementById('grafica');
    switch (action) {
      case 'show':
        showLoad.classList.remove('loadClose');
        showLoad.classList.add('loadOpen');

        showTable.classList.remove('tableClose');
        showTable.classList.add('tableOpen');

        showGrafica.classList.remove('graficaOpen');
        showGrafica.classList.add('graficaClose');
      break;
      case 'hidden':
        showLoad.classList.remove('loadOpen');
        showLoad.classList.add('loadClose');

        showTable.classList.remove('tableOpen');
        showTable.classList.add('tableClose');

        showGrafica.classList.remove('graficaClose');
        showGrafica.classList.add('graficaOpen');
      break;
    }
  }
}
