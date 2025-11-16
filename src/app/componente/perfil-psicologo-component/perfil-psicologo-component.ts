import {Component, inject, OnInit} from '@angular/core';
import {PerfilDetalleService} from '../../services/perfil-detalle-service';
import {SuscripcionService} from '../../services/suscripcion-service';
import {Router} from '@angular/router';
import {PerfilDetalle} from '../../model/perfil-detalle';
import {Suscripcion} from '../../model/suscripcion';
import {PerfilEditarPsicologoComponent} from './perfil-editar-psicologo/perfil-editar-psicologo';


@Component({
  selector: 'app-perfil-psicologo-component',
  standalone: true,
  imports: [
    PerfilEditarPsicologoComponent,
  ],
  templateUrl: './perfil-psicologo-component.html',
  styleUrl: './perfil-psicologo-component.css',
})
export class PerfilPsicologoComponent implements OnInit {
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
    const usuarioId = Number(localStorage.getItem('userId'));
    this.perfilService.obtenerPerfilPorId(usuarioId).subscribe({
      next: (data) => {
        this.perfil = data;
      },
      error: () => {
        this.error = 'No se pudo cargar el perfil';
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
    const usuarioId = Number(localStorage.getItem('userId'));
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

