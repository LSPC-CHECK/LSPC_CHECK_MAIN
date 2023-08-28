export class EntSal{

  idTransac?: any;
  idUser: string;
  idComputer: string;
  time: string;
  date: string;
  tipoTransac: string;

  constructor(idUser:string, idComputer:string, time:string, date:string, tipoTransac:string) {
    this.idUser = idUser;
    this.idComputer = idComputer;
    this.time = time;
    this.date = date;
    this.tipoTransac = tipoTransac;
  }
}
