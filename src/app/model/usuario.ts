// src/app/model/usuario.model.ts
export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  correo : string;
  contrasena: string;
  telefono: string;
  rol: {
    id: number;
    tipoRol: string; // "ROLE_ESTUDIANTE", "ROLE_PSICOLOGO", etc.
  };
  perfil: number;
  // otros campos si los necesitas
}
