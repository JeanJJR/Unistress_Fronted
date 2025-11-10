import {Time} from '@angular/common';
import {Usuario} from './usuario';

export interface Sesion{
  id:number;
  fecha:Date;
  hora: Time;
  mensaje:string;
  estado:string;
  estudiante:Usuario;
  psicologo:Usuario;
}
