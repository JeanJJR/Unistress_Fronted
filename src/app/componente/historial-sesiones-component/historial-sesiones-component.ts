import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import {Observable, map, startWith, debounceTime, distinctUntilChanged, switchMap, of} from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Sesion } from '../../model/sesion';
import { Usuario } from '../../model/usuario';
import { SessionService } from '../../services/sesion-service';
import { UsuarioService } from '../../services/usuario-servicio';

import { ResumenDialogComponent } from './resumen-dialog/resumen-dialog.component';
import {MatList, MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-historial-sesiones-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatList,
    MatListItem,
    MatIcon,
    MatSnackBarModule,
  ],
  templateUrl: './historial-sesiones-component.html',
  styleUrls: ['./historial-sesiones-component.css'],
})
export class HistorialSesionesComponent implements OnInit {
  private sessionService = inject(SessionService);
  private usuarioService = inject(UsuarioService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  estudiantes: Usuario[] = [];
  sesiones: Sesion[] = [];

  // --- Lógica de Autocompletado Reactivo (como en VistaEmocional) ---
  terminoControl = new FormControl('');
  filteredEstudiantes$: Observable<Usuario[]>;
  // -----------------------------------------------------------------

  // Estado
  selectedEstudiante: Usuario | null = null;

  displayedColumns: string[] = ['id', 'fecha', 'hora', 'estado', 'acciones'];

  ngOnInit(): void {
    this.cargarEstudiantes();

    // --- Inicializar el observable para el autocompletado ---
    this.filteredEstudiantes$ = this.terminoControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400), // Espera 400ms para no saturar el servidor mientras escribes
      distinctUntilChanged(),  // Evita buscar lo mismo dos veces seguidas
      switchMap(valor => {
        const termino = typeof valor === 'string' ? valor : '';

        if (!termino || termino.length < 2) {
          return of(this.estudiantes);
        }

        // Si hay texto, buscamos en el BACKEND
        return this.usuarioService.buscarEstudiantes(termino).pipe(
          catchError(error => {
            console.error('Error en búsqueda', error);
            return of([]); // Si falla, devolvemos lista vacía para no romper la UI
          })
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
    let est = this.estudiantes.find(e =>
      `${e.nombre} ${e.apellidos}`.toLowerCase() === texto
    );

    if (est) {
      this.seleccionarEstudiante(est);
    } else {
      console.error('Estudiante no encontrado. Seleccione un valor válido.');
      this.mostrarAlerta('No se encontró al paciente. Selecciona una opción del listado.');
      this.selectedEstudiante = null;
      this.sesiones = [];
    }
  }

  mostrarAlerta(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 4000,           // Dura 4 segundos
      horizontalPosition: 'center',
      verticalPosition: 'top',  // Aparece arriba
      panelClass: ['error-snackbar'] // Clase  para estilos
    });
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
