import {Time} from '@angular/common';

export interface Sesion {
  id: number;
  psicologoId: number;
  estudianteId: number;
  fecha: string;         // formato ISO: 'YYYY-MM-DD'
  hora: string;          // formato: 'HH:mm:ss'
  observaciones: string;
  mensaje: string;
  estado: string;
}
