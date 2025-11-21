// src/app/componente/perfil-estudiante-component/perfil-estudiante-component.ts
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilDetalleService } from '../../services/perfil-detalle-service';
import { SuscripcionService } from '../../services/suscripcion-service';
import { PerfilDetalle } from '../../model/perfil-detalle';
import { Suscripcion } from '../../model/suscripcion';
import { PerfilEditarComponent } from './perfil-editar/perfil-editar';
import {MatDialog} from '@angular/material/dialog';
import {TestEmocionalService} from '../../services/test-emocional-service';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-perfil-estudiante-component',
  standalone: true,
  imports: [ NgStyle],
  templateUrl: './perfil-estudiante-component.html',
  styleUrls: ['./perfil-estudiante-component.css']
})
export class PerfilEstudianteComponent implements OnInit {
  private perfilService = inject(PerfilDetalleService);
  private suscripcionService = inject(SuscripcionService);
  private testService = inject(TestEmocionalService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  perfil: PerfilDetalle | null = null;
  suscripcion: Suscripcion | null = null;
  promedioEmocional: number = 0.0;
  loading = true;
  error: string | null = null;
  mostrarModal = false;
  timestamp = Date.now(); // fuerza recarga de imagen
  subiendoFoto = false;

  ngOnInit(): void {
    const usuarioId = Number(localStorage.getItem('userId'));
    this.perfilService.obtenerPerfilPorId(usuarioId).subscribe({
      next: (data) => {
        this.perfil = data;
        this.cargarSuscripcion(usuarioId);
        this.cargarPromedioEmocional(usuarioId);
      },
      error: () => {
        this.error = 'No se pudo cargar el perfil';
        this.loading = false;
      }
    });
  }
  cargarPromedioEmocional(usuarioId: number): void {
    this.testService.obtenerPromedio(usuarioId).subscribe({
      next: (promedio) => {
        this.promedioEmocional = parseFloat(promedio.toFixed(1));
      },
      error: () => {
        this.promedioEmocional = 0.0;
        console.warn('No se pudo obtener el promedio emocional');
      }
    });
  }
  getFillStyle(): { [key: string]: string } {
    const max = 25;
    const height = Math.min(100, (this.promedioEmocional / max) * 100); // escala 0–100px

    let color = '#ddd'; // por defecto
    if (this.promedioEmocional <= 10) {
      color = '#4CAF50'; // verde: bajo estrés
    } else if (this.promedioEmocional <= 20) {
      color = '#FFC107'; // amarillo: moderado
    } else {
      color = '#F44336'; // rojo: alto estrés
    }

    return {
      height: `${height}px`,
      backgroundColor: color
    };
  }



  cargarSuscripcion(usuarioId: number): void {
    this.suscripcionService.obtenerSuscripcionPorUsuarioId(usuarioId).subscribe({
      next: (data: Suscripcion[]) => {
        // buscamos la activa, si no hay, usamos la primera, si tampoco hay, null
        const activa = data.find(s => s.estado === 'ACTIVA');
        this.suscripcion = activa ?? (data.length > 0 ? data[0] : null);
        this.loading = false;
      },
      error: () => {
        this.suscripcion = null;
        this.loading = false;
      }
    });
  }

  abrirModal() {
    if (!this.perfil) return;

    const dialogRef = this.dialog.open(PerfilEditarComponent, {
      data: { perfil: this.perfil },
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((perfilEditado: PerfilDetalle | undefined) => {
      if (perfilEditado) {
        this.guardarPerfil(perfilEditado);
      }
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarPerfil(perfilEditado: any) {
    const usuarioId = Number(localStorage.getItem('userId'));


    if (!perfilEditado.contrasena) {
      delete perfilEditado.contrasena;
    }

    this.perfilService.actualizarPerfil(usuarioId, perfilEditado).subscribe({
      next: (respuesta) => {
        this.perfil = { ...this.perfil, ...perfilEditado };
        this.cerrarModal();
      },
      error: (err) => console.error('Error real:', err)
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const archivo = input.files[0];
    const usuarioId = Number(localStorage.getItem('userId'));

    this.perfilService.actualizarFoto(usuarioId, archivo).subscribe({
      next: () => {
        this.perfilService.obtenerPerfilPorId(usuarioId).subscribe({
          next: (data) => {
            this.perfil = data;
            this.timestamp = Date.now();
          }
        });
      },
      error: (err) => {
        console.error('Error al subir foto:', err);
        alert('No se pudo actualizar la foto');
      }
    });
  }

  protected readonly document = document;
}
