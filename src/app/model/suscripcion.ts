export interface Suscripcion {
  id: number;
  usuarioId: number;
  tipo: string; // "BASICO" o "PREMIUM"
  fechaInicio: string;
  fechaFin: string;
  estado: string;
}
