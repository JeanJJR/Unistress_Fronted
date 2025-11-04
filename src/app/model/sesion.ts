import {Time} from '@angular/common';

export interface Sesion{
  id:number;
  fecha:Date;
  hora: Time;
  observaciones:string;
  mensaje:string;
  estado:string;
}
