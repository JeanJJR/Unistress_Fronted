import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Sesion } from '../../model/sesion';
import { Usuario } from '../../model/usuario';
import { SessionService } from '../../services/sesion-service';
import { UsuarioService } from '../../services/usuario-servicio';

import { ResumenDialogComponent } from './resumen-dialog/resumen-dialog.component';
@Component({
  selector: 'app-historial-sesiones-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    ResumenDialogComponent
  ],
  templateUrl: './historial-sesiones-component.html',
  styleUrls: ['./historial-sesiones-component.css'],
})
export class HistorialSesionesComponent implements OnInit {
  private sessionService = inject(SessionService);
  private usuarioService = inject(UsuarioService);
  private dialog = inject(MatDialog);

  estudiantes: Usuario[] = [];
  estudiantesFiltrados: Usuario[] = [];
  sesiones: Sesion[] = [];

  // Estado
  selectedEstudiante: Usuario | null = null;
  terminoBusqueda: string = '';

  displayedColumns: string[] = ['id', 'fecha', 'hora', 'estado', 'acciones'];

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {

    this.usuarioService.listarEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.estudiantesFiltrados = data;
      },
      error: (err) => console.error('Error al cargar estudiantes:', err)
    });
  }

  buscarPorNombre(): void {
    const termino = this.terminoBusqueda.toLowerCase();
    this.estudiantesFiltrados = this.estudiantes.filter(est =>
      `${est.nombre} ${est.apellidos}`.toLowerCase().includes(termino)
    );
  }

  seleccionarEstudiante(estudiante: Usuario): void {
    this.selectedEstudiante = estudiante;
    this.terminoBusqueda = `${estudiante.nombre} ${estudiante.apellidos}`;
    this.cargarHistorial(estudiante.id);
  }

  cargarHistorial(estudianteId: number): void {
    this.sessionService.listhistorialporestudiante(estudianteId).subscribe({
      next: (data) => {
        this.sesiones = data;
      },
      error: (err) => {
        console.error('Error al cargar historial de sesiones:', err);
        this.sesiones = [];
      }
    });
  }

  aceptarSesion(sesion: Sesion): void {
    this.sessionService.aceptarSesion(sesion.id).subscribe({
      next: () => {
        sesion.estado = 'ACEPTADA';
        console.log('Sesión aceptada');
      },
      error: (err) => console.error('Error al aceptar la sesión:', err)
    });
  }

  abrirResumen(sesion: Sesion): void {
    this.dialog.open(ResumenDialogComponent, {
      width: '400px',
      data: sesion
    });
  }
}
