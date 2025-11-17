export interface AuthResponse {
  jwt: string;
  roles: string[];     // ej: ["ROLE_ESTUDIANTE"]
  id: number;
}
