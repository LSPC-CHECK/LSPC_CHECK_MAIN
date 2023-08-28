export class Pqrs{

  idInform?: any;
  idUser: string;
  reason: string;
  time: string;
  date: Date;
  description: string;
  tipoTransac: string;

  constructor(idUser: string, reason: string, time: string, date: Date, description: string, tipoTransac: string){
    this.idUser = idUser;
    this.reason = reason;
    this.time = time;
    this.date = date;
    this.description = description;
    this.tipoTransac = tipoTransac;
  }
}
