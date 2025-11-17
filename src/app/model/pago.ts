// src/app/model/pago.ts
export interface Pago {
  id?: number;
  suscripcionId: number;
  metodoPagoId: number;
  monto: number;
  fechaPago: string;   // "YYYY-MM-DD"
  estado: string;      // "PAGADO", "PENDIENTE", etc.
}
