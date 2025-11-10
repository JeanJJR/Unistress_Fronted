export interface Perfil {
  id: number;
  usuarioId: number;
  tipoPerfil: 'ESTUDIANTE' | 'PSICOLOGO';
  universidad: string;
  carrera: string;
  ciclo: string;
  estadoAcademico: string;
  especialidad: string;
  colegiatura: string;
  anosExperiencia: number;
  fotoUrl: string;
  descripcion: string;
}
