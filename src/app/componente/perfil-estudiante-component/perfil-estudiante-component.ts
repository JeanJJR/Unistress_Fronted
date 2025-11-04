// src/app/componente/perfil-estudiante-component/perfil-estudiante-component.ts
import { Component, OnInit } from '@angular/core';
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
  perfil: PerfilDetalle | null = null;
  suscripcion: Suscripcion | null = null;
  loading = true;
  error: string | null = null;
  mostrarModal = false;
  timestamp = Date.now(); // fuerza recarga de imagen
  subiendoFoto = false;   // opcional para mostrar estado


  constructor(
    private perfilService: PerfilDetalleService,
    private suscripcionService: SuscripcionService,
    private router: Router
  ) {
  }

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
        console.log(' Respuesta del backend:', respuesta); // Será un string
        this.perfil = {...perfilEditado};
        this.cerrarModal();
        //alert(' Perfil actualizado correctamente');
      },
      error: (err) => {
        console.error(' Error real:', err);
        // alert(' No se pudo guardar los cambios.');
      }
    });

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const archivo = input.files[0];
    const usuarioId = 2;

    if (!usuarioId) {
      console.error(' usuarioId no disponible');
      return;
    }

    this.perfilService.actualizarFoto(usuarioId, archivo).subscribe({
      next: () => {
        // Recarga el perfil (usando el mismo usuarioId)
        this.perfilService.obtenerPerfilPorId(usuarioId).subscribe({
          next: (data) => {
            this.perfil = data;
            this.timestamp = Date.now(); // fuerza recarga de imagen
          }
        });
      },
      error: (err) => {
        console.error(' Error al subir foto:', err);
        alert('No se pudo actualizar la foto');
      }
    });
  }



  protected readonly document = document;
}

