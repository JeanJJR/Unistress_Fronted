// src/app/estado-emocional/estado-emocional.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { RegistroEmocionalService } from '../../services/estado-emocional-service';
import { RegistroEmocional } from '../../model/estado-emocional';

@Component({
  selector: 'app-estado-emocional-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSliderModule,
    MatTableModule,
    MatSnackBarModule
  ],
  templateUrl: './estado-emocional-component.html',
  styleUrls: ['./estado-emocional-component.css']
})
export class EstadoEmocionalComponent implements OnInit {
  emocionSeleccionada: string | null = null;
  nivel = 5;
  comentario = '';
  historial: RegistroEmocional[] = [];
  usuarioId = Number(localStorage.getItem('userId'));

  // Columnas de la tabla
  displayedColumns: string[] = ['fecha', 'emocion', 'nivel', 'descripcion'];

  constructor(private registroService: RegistroEmocionalService,private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.registroService.listarPorUsuario(this.usuarioId).subscribe({
      next: (data) => this.historial = data,
      error: (err) => console.error('Error al cargar historial:', err)
    });
  }

  guardarEmocion(): void {
    if (!this.emocionSeleccionada) {
      //alert('Selecciona una emoción');
      this.snackBar.open('Selecciona una emocion', 'Cerrar', {
        duration: 3000, // tiempo en ms
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }
    if (this.nivel < 1 || this.nivel > 10) {
      alert('El nivel debe estar entre 1 y 10');
      return;
    }

    const nuevoRegistro: RegistroEmocional = {
      usuarioId: this.usuarioId,
      emocion: this.emocionSeleccionada,
      nivel: this.nivel,
      descripcion: this.comentario.trim() || 'Sin descripción'
    };

    this.registroService.registrar(nuevoRegistro).subscribe({
      next: () => {
        this.resetForm();
        this.cargarHistorial();
        this.snackBar.open('Emoción registrada correctamente ', 'Cerrar', {
          duration: 3000, // tiempo en ms
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      error: (err) => {
        console.error('Error al registrar emoción:', err);
        this.snackBar.open('No se pudo registrar la emoción ', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });

  }

  resetForm(): void {
    this.emocionSeleccionada = null;
    this.nivel = 5;
    this.comentario = '';
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
