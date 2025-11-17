import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Importar módulos de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BancoPreguntaService } from '../../services/banco-pregunta.service';
import { BancoPregunta } from '../../model/banco-pregunta';

@Component({
  selector: 'app-banco-preguntas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './banco-preguntas.component.html',
  styleUrls: ['./banco-preguntas.component.css']
})
export class BancoPreguntasComponent implements OnInit {
  nuevaPregunta: string = '';
  selectedIndex: number = -1;
  selectedQuestion: BancoPregunta | null = null;
  preguntas: BancoPregunta[] = [];
  loading: boolean = false;

  constructor(
    private bancoPreguntaService: BancoPreguntaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas(): void {
    this.loading = true;
    console.log('Cargando preguntas...');

    this.bancoPreguntaService.listar().subscribe({
      next: (data) => {
        console.log('Preguntas cargadas:', data);
        this.preguntas = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error completo al cargar preguntas:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Error body:', error.error);

        let errorMessage = 'Error al cargar las preguntas';
        if (error.status === 401) {
          errorMessage = 'No estás autenticado. Por favor inicia sesión.';
        } else if (error.status === 403) {
          errorMessage = 'No tienes permisos para ver las preguntas.';
        } else if (error.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.';
        }

        this.showMessage(errorMessage, 'error');
        this.loading = false;
      }
    });
  }

  crearPregunta(): void {
    if (this.nuevaPregunta && this.nuevaPregunta.trim().length > 0) {
      this.loading = true;

      const nuevaPreguntaObj: BancoPregunta = {
        enunciado: this.nuevaPregunta.trim()
      };

      console.log('Enviando pregunta:', nuevaPreguntaObj);

      this.bancoPreguntaService.registrar(nuevaPreguntaObj).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.showMessage('Pregunta creada exitosamente', 'success');
          this.nuevaPregunta = '';
          // Recargar las preguntas
          this.cargarPreguntas();
        },
        error: (error) => {
          console.error('Error completo al crear pregunta:', error);
          console.error('Status:', error.status);
          console.error('Message:', error.message);
          console.error('Error body:', error.error);

          let errorMessage = 'Error al crear la pregunta';
          if (error.status === 401) {
            errorMessage = 'No estás autenticado. Por favor inicia sesión.';
          } else if (error.status === 403) {
            errorMessage = 'No tienes permisos para crear preguntas. Solo psicólogos pueden crear preguntas.';
          } else if (error.status === 0) {
            errorMessage = 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo en http://localhost:8080';
          } else if (error.error) {
            errorMessage = `Error: ${error.error}`;
          }

          this.showMessage(errorMessage, 'error');
          this.loading = false;
        }
      });
    }
  }

  selectQuestion(index: number): void {
    this.selectedIndex = index;
    this.selectedQuestion = this.preguntas[index];
  }

  clearSelection(): void {
    this.selectedIndex = -1;
    this.selectedQuestion = null;
  }

  deletePregunta(index: number, event: Event): void {
    event.stopPropagation();

    const pregunta = this.preguntas[index];
    if (pregunta.id) {
      this.loading = true;

      console.log('Eliminando pregunta con ID:', pregunta.id);

      this.bancoPreguntaService.eliminar(pregunta.id).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.preguntas.splice(index, 1);
          if (this.selectedIndex === index) {
            this.clearSelection();
          } else if (this.selectedIndex > index) {
            this.selectedIndex--;
          }
          this.showMessage('Pregunta eliminada exitosamente', 'success');
          this.loading = false;
        },
        error: (error) => {
          console.error('Error completo al eliminar pregunta:', error);
          console.error('Status:', error.status);
          console.error('Message:', error.message);
          console.error('Error body:', error.error);

          let errorMessage = 'Error al eliminar la pregunta';
          if (error.status === 401) {
            errorMessage = 'No estás autenticado. Por favor inicia sesión.';
          } else if (error.status === 403) {
            errorMessage = 'No tienes permisos para eliminar esta pregunta.';
          } else if (error.status === 0) {
            errorMessage = 'No se pudo conectar con el servidor.';
          }

          this.showMessage(errorMessage, 'error');
          this.loading = false;
        }
      });
    }
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}
