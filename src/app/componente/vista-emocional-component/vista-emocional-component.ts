import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Observable, map, startWith } from 'rxjs';
import { Usuario } from '../../model/usuario';
import { RegistroEmocional } from '../../model/estado-emocional';
import { UsuarioService } from '../../services/usuario-servicio';
import { RegistroEmocionalService } from '../../services/estado-emocional-service';

@Component({
  selector: 'app-vista-emocional',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './vista-emocional-component.html',
  styleUrls: ['./vista-emocional-component.css']
})
export class VistaEmocionalComponent implements OnInit {
  estudiantes: Usuario[] = [];
  registros: RegistroEmocional[] = [];
  estudianteSeleccionado: Usuario | null = null;

  // Autocompletado reactivo
  terminoControl = new FormControl('');
  filteredEstudiantes$: Observable<Usuario[]>;

  // Columnas de la tabla
  displayedColumns: string[] = ['fecha', 'emocion', 'descripcion'];

  constructor(
    private usuarioService: UsuarioService,
    private registroService: RegistroEmocionalService
  ) {}

  ngOnInit(): void {
    this.cargarEstudiantes();

    this.filteredEstudiantes$ = this.terminoControl.valueChanges.pipe(
      startWith(''),
      map(valor => {
        const texto = typeof valor === 'string' ? valor.toLowerCase() : '';
        return this.estudiantes.filter(est =>
          `${est.nombre} ${est.apellidos}`.toLowerCase().includes(texto)
        );
      })
    );
  }

  cargarEstudiantes(): void {
    this.usuarioService.listarEstudiantes().subscribe({
      next: (data) => {
        this.estudiantes = data;
      },
      error: (err) => console.error('Error al cargar estudiantes:', err)
    });
  }

  seleccionarEstudiante(estudiante: Usuario): void {
    this.estudianteSeleccionado = estudiante;
    this.terminoControl.setValue(`${estudiante.nombre} ${estudiante.apellidos}`);
    this.cargarHistorial(estudiante.id);
  }

  buscarManualmente(): void {
    const texto = this.terminoControl.value?.toLowerCase() || '';
    const est = this.estudiantes.find(e =>
      `${e.nombre} ${e.apellidos}`.toLowerCase() === texto
    );
    if (est) {
      this.seleccionarEstudiante(est);
    } else {
      alert('Estudiante no encontrado');
    }
  }

  cargarHistorial(usuarioId: number): void {
    this.registroService.listarPorUsuario(usuarioId).subscribe({
      next: (data) => this.registros = data,
      error: (err) => {
        console.error('Error al cargar registros:', err);
        this.registros = [];
      }
    });
  }

  esHoy(fechaStr: string | undefined): boolean {
    if (!fechaStr) return false;
    const fecha = new Date(fechaStr);
    const hoy = new Date();
    return (
      fecha.getDate() === hoy.getDate() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    );
  }
}
