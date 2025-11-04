// src/app/model/perfil-detalle.model.ts
export interface PerfilDetalle {
  id: number;
  usuarioId: number;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  tipoPerfil: string; // "ESTUDIANTE" o "PSICOLOGO"

  // Campos solo para estudiante
  universidad?: string;
  carrera?: string;
  ciclo?: string;
  estadoAcademico?: string;

  // Campos solo para psicólogo (opcional, pero los dejamos por si acaso)
  especialidad?: string;
  colegiatura?: string;
  anosExperiencia?: number;
  telefonoConsulta?: string;
  fotoUrl?: string;
  descripcion?: string;
}
