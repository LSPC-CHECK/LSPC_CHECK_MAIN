export class Computer{
  idComputer?:any;
  idSerial?:String;
  color?:String;
  mark?:String;
  peripherals?:String;
  idUser?:number | undefined;

  constructor(idSerial:string,color:string,mark:string,peripherals:string,idUser?:number){
      this.idSerial=idSerial;
      this.color = color;
      this.mark = mark;
      this.peripherals = peripherals;
      this.idUser = idUser;
  }
}
