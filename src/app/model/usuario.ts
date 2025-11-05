// src/app/model/usuario.model.ts
export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  correo : string;
  contraseña: string;
  telefono: string;
  rol : number;
  perfil: number;
  // otros campos si los necesitas
}
