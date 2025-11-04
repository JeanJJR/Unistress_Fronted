// src/app/model/registro-emocional.model.ts
export interface RegistroEmocional {
  id?: number;
  usuarioId: number;
  emocion: string;      // 'feliz', 'triste', 'enojado', 'ansioso', 'neutral'
  nivel: number;        // 1 a 10
  descripcion: string;
  fecha?: string;       // opcional, si el backend lo incluye
}
