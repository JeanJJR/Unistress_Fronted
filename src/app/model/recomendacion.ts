export interface Recomendacion {
  id?: number;
  mensaje: string;
  tipo: string;
  registroEmocionalId: number;
  usuarioId: number;
  nombreEstudiante?: string;

  psicologo?: {
    id: number;
  };
}
