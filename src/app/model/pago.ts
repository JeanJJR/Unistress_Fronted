export interface Pago {
  id: number;
  suscripcionId: number;
  metodoPagoId: number;
  monto: number;
  fechaPago: string;   // formato ISO: 'YYYY-MM-DD'
  estado: string;
}
