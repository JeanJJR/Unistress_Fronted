// src/app/estado-emocional/estado-emocional.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RegistroEmocionalService} from '../../services/estado-emocional-service';
import {RegistroEmocional} from '../../model/estado-emocional';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-estado-emocional-component',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './estado-emocional-component.html',
  styleUrls: ['./estado-emocional-component.css']
})
export class EstadoEmocionalComponent implements OnInit {
  emocionSeleccionada: string | null = null;
  nivel = 5;
  comentario = '';
  historial: RegistroEmocional[] = [];
  usuarioId = 2; // ← ID fijo del estudiante (reemplaza con auth cuando lo tengas)

  constructor(private registroService: RegistroEmocionalService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.registroService.listarPorUsuario(this.usuarioId).subscribe({
      next: (data) => this.historial = data,
      error: (err) => {
        console.error('Error al cargar historial:', err);
        //alert('No se pudo cargar el historial');
      }
    });
  }

  guardarEmocion(): void {
    if (!this.emocionSeleccionada) {
      alert('Selecciona una emoción');
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
        this.cargarHistorial(); // Refresca la lista
        alert('Emoción registrada correctamente');
      },
      error: (err) => {
        console.error('Error al registrar emoción:', err);
        alert('No se pudo registrar la emoción');
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
    return fecha.getDate() === hoy.getDate() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear();
  }

}
