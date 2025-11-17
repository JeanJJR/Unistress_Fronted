import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // <-- AÑADIDO
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms'; // <-- AÑADIDO
import { Observable, map, startWith } from 'rxjs'; // <-- AÑADIDO

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
    ReactiveFormsModule, // <-- AÑADIDO
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    // MatListModule, // <-- Ya no se usa
    MatTableModule,
    MatDialogModule,
    MatAutocompleteModule, // <-- AÑADIDO
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
  sesiones: Sesion[] = [];

  // --- Lógica de Autocompletado Reactivo (como en VistaEmocional) ---
  terminoControl = new FormControl('');
  filteredEstudiantes$: Observable<Usuario[]>;
  // -----------------------------------------------------------------

  // Estado
  selectedEstudiante: Usuario | null = null;
  // terminoBusqueda: string = ''; // <-- Reemplazado por terminoControl

  displayedColumns: string[] = ['id', 'fecha', 'hora', 'estado', 'acciones'];

  ngOnInit(): void {
    this.cargarEstudiantes();

    // --- Inicializar el observable para el autocompletado ---
    this.filteredEstudiantes$ = this.terminoControl.valueChanges.pipe(
      startWith(''),
      map(valor => {
        const texto = typeof valor === 'string' ? valor.toLowerCase() : '';
        return this.estudiantes.filter(est =>
          `${est.nombre} ${est.apellidos}`.toLowerCase().includes(texto)
        );
      })
    );
    // -------------------------------------------------------
  }

  cargarEstudiantes(): void {
    this.usuarioService.listarEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
      },
      error: (err) => console.error('Error al cargar estudiantes:', err)
    });
  }

  // --- FUNCIÓN DE BÚSQUEDA ACTUALIZADA ---
  buscarManualmente(): void {
    const texto = this.terminoControl.value?.toLowerCase() || '';
    const est = this.estudiantes.find(e =>
      `${e.nombre} ${e.apellidos}`.toLowerCase() === texto
    );

    if (est) {
      this.seleccionarEstudiante(est);
    } else {
      console.error('Estudiante no encontrado. Seleccione un valor válido.');
      this.selectedEstudiante = null;
      this.sesiones = [];
      // Opcional: alert('Estudiante no encontrado');
    }
  }

  seleccionarEstudiante(estudiante: Usuario): void {
    this.selectedEstudiante = estudiante;
    // Sincronizamos el valor en el input
    this.terminoControl.setValue(`${estudiante.nombre} ${estudiante.apellidos}`);
    this.cargarHistorial(estudiante.id);
  }
  // ------------------------------------------

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
