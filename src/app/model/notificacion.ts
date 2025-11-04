
export interface Notificacion {
  id: number;
  usuarioId: number;
  mensaje: string;
  tipo: string;
  fechaEnvio: string; // ej: "2025-04-09"
  estado: string;     // "LEIDA" o "NO_LEIDA"
}
