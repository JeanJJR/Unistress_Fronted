// src/app/admin-perfiles/admin-perfiles.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { PerfilDetalle } from '../../model/perfil-detalle';
import { AdminService } from '../../services/admin-service';
import { Estudiante } from '../../model/estudiante';
import { Psicologo } from '../../model/psicologo';
import {MatIcon, MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-admin-perfiles',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatIcon
  ],
  templateUrl: './admin-perfiles.html',
  styleUrls: ['./admin-perfiles.css']
})
export class AdminPerfilesComponent implements OnInit {
  perfiles: PerfilDetalle[] = [];
  perfilEdicion: PerfilDetalle | null = null;
  universidades = ['UPC', 'UNI', 'PUCP', 'USIL'];
  carreras = ['Ingeniería de Sistemas', 'Ingeniería de Software', 'Psicología', 'Medicina'];
  ciclos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  estados = ['Regular', 'Irregular', 'Egresado'];

  modoEdicion = false;
  nuevoPerfil: PerfilDetalle = this.inicializarPerfilVacio();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarPerfiles();
  }


  cargarPerfiles(): void {
    this.adminService.listarEstudiantes().subscribe({
      // ======================
      // INICIO DE CORRECCIÓN
      // ======================
      next: (estudiantes: any[]) => { // <-- CORRECCIÓN 1: Aceptar 'any[]'

        // Aplanamos la estructura anidada (e + e.perfil)
        const estudiantesConTipo: PerfilDetalle[] = estudiantes.map((e: any) => { // <-- CORRECCIÓN 2: Usar '(e: any)'
          const flatProfile = {
            ...this.inicializarPerfilVacio(), // 1. Pone la base
            ...e.perfil,                    // 2. Extiende los datos del perfil (universidad, carrera, etc.)
            ...e,                           // 3. Extiende los datos del usuario (nombre, correo, etc.)
            id: e.id                        // 4. Asegura que el ID principal sea el ID de usuario
          };
          delete flatProfile.perfil; // Limpiamos el objeto anidado original
          delete flatProfile.rol;    // Limpiamos el rol
          return flatProfile as PerfilDetalle;
        });
        // ======================
        // FIN DE CORRECCIÓN
        // ======================


        this.adminService.listarPsicologos().subscribe({
          // ======================
          // INICIO DE CORRECCIÓN
          // ======================
          next: (psicologos: any[]) => { // <-- CORRECCIÓN 3: Aceptar 'any[]'

            // Hacemos lo mismo para los psicólogos
            const psicologosConTipo: PerfilDetalle[] = psicologos.map((p: any) => { // <-- CORRECCIÓN 4: Usar '(p: any)'
              const flatProfile = {
                ...this.inicializarPerfilVacio(), // 1. Pone la base
                ...p.perfil,                    // 2. Extiende los datos del perfil (especialidad, etc.)
                ...p,                           // 3. Extiende los datos del usuario (nombre, correo, etc.)
                id: p.id                        // 4. Asegura que el ID principal sea el ID de usuario
              };
              delete flatProfile.perfil; // Limpiamos
              delete flatProfile.rol;    // Limpiamos
              return flatProfile as PerfilDetalle;
            });
            // ======================
            // FIN DE CORRECCIÓN
            // ======================

            this.perfiles = [...estudiantesConTipo, ...psicologosConTipo];
          },
          error: (err) => console.error('Error al cargar psicólogos:', err)
        });
      },
      error: (err) => console.error('Error al cargar estudiantes:', err)
    });
  }

  inicializarPerfilVacio(): PerfilDetalle {
    return {
      id: 0,
      usuarioId: 0,
      nombre: '',
      apellidos: '',
      correo: '',
      telefono: '',
      contrasena: '',
      tipoPerfil: 'ESTUDIANTE',
      universidad: '',
      carrera: '',
      ciclo: '',
      estadoAcademico: '',
      especialidad: '',
      colegiatura: '',
      anosExperiencia: 0,
      telefonoConsulta: '',
      descripcion: '',
      fotoUrl: ''
    };
  }

  esEstudiante(perfil: PerfilDetalle): boolean {
    return perfil.tipoPerfil === 'ESTUDIANTE';
  }

  iniciarEdicion(perfil: PerfilDetalle): void {
    this.perfilEdicion = { ...perfil };
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    this.perfilEdicion = null;
    this.modoEdicion = false;
    this.nuevoPerfil = this.inicializarPerfilVacio();
  }

  guardarPerfil(): void {
    if (this.modoEdicion && this.perfilEdicion) {
      this.adminService.actualizarPerfil(this.perfilEdicion.id, this.perfilEdicion).subscribe({
        next: () => {
          alert('Perfil actualizado correctamente');
          this.cargarPerfiles();
          this.cancelarEdicion();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el perfil');
        }
      });
    } else {
      if (this.nuevoPerfil.contrasena.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
      }

      if (this.nuevoPerfil.tipoPerfil === 'ESTUDIANTE') {
        const estudiante: Estudiante = {
          nombre: this.nuevoPerfil.nombre ?? '',
          apellidos: this.nuevoPerfil.apellidos ?? '',
          correo: this.nuevoPerfil.correo ?? '',
          contrasena: this.nuevoPerfil.contrasena ?? '',
          telefono: this.nuevoPerfil.telefono ?? '',
          universidad: this.nuevoPerfil.universidad ?? '',
          carrera: this.nuevoPerfil.carrera ?? '',
          ciclo: this.nuevoPerfil.ciclo ?? '',
          estadoAcademico: this.nuevoPerfil.estadoAcademico ?? ''
        };

        this.adminService.registrarEstudiante(estudiante).subscribe({
          next: () => {
            alert('Estudiante registrado correctamente');
            this.cargarPerfiles();
            this.nuevoPerfil = this.inicializarPerfilVacio();
          },
          error: (err) => {
            console.error('Error al registrar estudiante:', err);
            alert('Error al registrar el estudiante');
          }
        });

      } else {
        const psicologo: Psicologo = {
          nombre: this.nuevoPerfil.nombre ?? '',
          apellidos: this.nuevoPerfil.apellidos ?? '',
          correo: this.nuevoPerfil.correo ?? '',
          contrasena: this.nuevoPerfil.contrasena ?? '',
          telefono: this.nuevoPerfil.telefono ?? '',
          especialidad: this.nuevoPerfil.especialidad ?? '',
          colegiatura: this.nuevoPerfil.colegiatura ?? '',
          anosExperiencia: this.nuevoPerfil.anosExperiencia ?? 0
        };

        this.adminService.registrarPsicologo(psicologo).subscribe({
          next: () => {
            alert('Psicólogo registrado correctamente');
            this.cargarPerfiles();
            this.nuevoPerfil = this.inicializarPerfilVacio();
          },
          error: (err) => {
            console.error('Error al registrar psicólogo:', err);
            alert('Error al registrar el psicólogo');
          }
        });
      }
    }
  }

  eliminarPerfil(id: number): void {
    if (confirm('¿Eliminar perfil y usuario?')) {
      this.adminService.eliminarUsuario(id).subscribe({
        next: () => {
          alert('Perfil eliminado correctamente');
          this.cargarPerfiles();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar el perfil');
        }
      });
    }
  }
  displayedColumns: string[] = ['id', 'nombre', 'correo', 'tipo', 'acciones'];

  nuevaContrasena = '';
  verContrasena = false;

  toggleContrasena(): void {
    this.verContrasena = !this.verContrasena;
  }

}
