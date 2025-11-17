export interface Suscripcion {
  id: number;
  tipo: string;         // PREMIUM, BASICA, etc.
  fechaInicio: string;
  fechaFin: string;
  estado: string;       // ACTIVA, INACTIVA
  usuario?: any;
}
