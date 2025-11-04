// src/app/componente/perfil-estudiante-component/perfil-estudiante-component.ts
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilDetalleService } from '../../services/perfil-detalle-service';
import { SuscripcionService } from '../../services/suscripcion-service';
import { PerfilDetalle } from '../../model/perfil-detalle';
import { Suscripcion } from '../../model/suscripcion';
import { PerfilEditarComponent } from './perfil-editar/perfil-editar';

@Component({
  selector: 'app-perfil-estudiante-component',
  standalone: true,
  imports: [PerfilEditarComponent],
  templateUrl: './perfil-estudiante-component.html',
  styleUrls: ['./perfil-estudiante-component.css']
})
export class PerfilEstudianteComponent implements OnInit {
  private perfilService = inject(PerfilDetalleService);
  private suscripcionService = inject(SuscripcionService);
  private router = inject(Router);

  perfil: PerfilDetalle | null = null;
  suscripcion: Suscripcion | null = null;
  loading = true;
  error: string | null = null;
  mostrarModal = false;
  timestamp = Date.now(); // fuerza recarga de imagen
  subiendoFoto = false;

  ngOnInit(): void {
    const usuarioId = 2;
    this.perfilService.obtenerPerfilPorId(usuarioId).subscribe({
      next: (data) => {
        this.perfil = data;
        this.cargarSuscripcion(usuarioId);
      },
      error: () => {
        this.error = 'No se pudo cargar el perfil';
        this.loading = false;
      }
    });
  }

  cargarSuscripcion(usuarioId: number): void {
    this.suscripcionService.obtenerSuscripcionPorUsuarioId(usuarioId).subscribe({
      next: (data) => {
        this.suscripcion = data;
        this.loading = false;
      },
      error: () => {
        this.suscripcion = null;
        this.loading = false;
      }
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarPerfil(perfilEditado: PerfilDetalle) {
    const usuarioId = 2;
    this.perfilService.actualizarPerfil(usuarioId, perfilEditado).subscribe({
      next: (respuesta) => {
        console.log('Respuesta del backend:', respuesta);
        this.perfil = { ...perfilEditado };
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error real:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const archivo = input.files[0];
    const usuarioId = 2;

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
