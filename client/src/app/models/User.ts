export class User{
  idUser?: any;
  name?: string;
  secName?: string;
  lastname?: string;
  secSurname?: string;
  password?: string;
  email?: string;
  cardId?: string;
  idProfile?: number ;
  state?: string;
  type?:string;
  namePhoto?:string;
  data?: ArrayBuffer;
  resetPasswordToken?:string;
  resetPasswordTokenExpiresAt?:Date;
  constructor(name: string, secName: string, lastname: string, secSurname: string, password: string, email: string, cardId: string, idProfile: number,  state: string,  type:string,namePhoto:string,data: ArrayBuffer,resetPasswordToken:string,resetPasswordTokenExpiresAt:Date){
    this.name = name;
    this.secName = secName;
    this.lastname = lastname;
    this.secSurname = secSurname;
    this.password = password;
    this.email = email;
    this.cardId = cardId;
    this.idProfile = idProfile;
    this.state = state;
    this.type  = type;
    this.namePhoto = namePhoto;
    this.data = data;
    this.resetPasswordToken=resetPasswordToken;
    this.resetPasswordTokenExpiresAt=resetPasswordTokenExpiresAt;
  }
}
