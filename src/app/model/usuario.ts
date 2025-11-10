import {PerfilDetalle} from './perfil-detalle';
import {Rol} from './rol';

export class Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  contrasena: string;
  telefono: string;
  perfil:PerfilDetalle;
  rol:Rol;

}
