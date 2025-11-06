import { PreguntaTest } from './pregunta-test';

export interface TestEmocional {
  id: number;
  usuarioId: number;
  fecha: string;           // formato ISO: 'YYYY-MM-DD'
  puntajeTotal: number;
  nivelEstres: string;
  preguntas: PreguntaTest[];
}
