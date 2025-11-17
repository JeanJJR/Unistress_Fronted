// src/app/componente/suscripcion-component/suscripcion-component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { SuscripcionService } from '../../services/suscripcion-service';

import { Suscripcion } from '../../model/suscripcion';

@Component({
  selector: 'app-suscripcion-component',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './suscripcion-component.html',
  styleUrls: ['./suscripcion-component.css'],
})
export class SuscripcionComponent implements OnInit {

  constructor(
    private router: Router,
    private suscripcionService: SuscripcionService
  ) {}

  // datos que se muestran en la vista
  plan = '';
  estado: 'Activo' | 'Cancelado' = 'Cancelado';
  inicio: Date | null = null;
  fin: Date | null = null;

  beneficios = [
    'Sesiones ilimitadas',
    'Acceso a especialistas',
    'Prioridades de atención'
  ];

  // suscripción que llega del backend
  suscripcionActual: Suscripcion | null = null;


  usuarioId = 2; // por ahora, de prueba

  ngOnInit(): void {
    this.cargarSuscripcion();
  }

  private cargarSuscripcion(): void {
    this.suscripcionService.getPorUsuario(this.usuarioId).subscribe({
      next: (suscripciones: Suscripcion[]) => {
        if (!suscripciones || suscripciones.length === 0) {
          // no tiene suscripción
          return;
        }

        // tomamos la suscripción ACTIVA si existe, sino la primera
        const activa: Suscripcion | undefined = suscripciones.find(
          (s: Suscripcion) => s.estado === 'ACTIVA'
        );
        const actual: Suscripcion = activa ?? suscripciones[0];

        this.suscripcionActual = actual;

        // mapeo a las variables de la vista (ya NO es null)
        this.plan = actual.tipo;
        this.estado = actual.estado === 'ACTIVA'
          ? 'Activo'
          : 'Cancelado';

        this.inicio = actual.fechaInicio
          ? new Date(actual.fechaInicio)
          : null;

        this.fin = actual.fechaFin
          ? new Date(actual.fechaFin)
          : null;
      },
      error: (err: any) => {
        console.error('Error cargando suscripción', err);
      }
    });
  }


  private toLocalDateString(d: Date): string {
    // LocalDate en backend -> "YYYY-MM-DD"
    return d.toISOString().substring(0, 10);
  }

  cancelar(): void {
    if (!this.suscripcionActual) return;

    const actualizada: Suscripcion = {
      ...this.suscripcionActual,
      estado: 'INACTIVA',
    };

    this.suscripcionService.actualizar(actualizada).subscribe({
      next: () => {
        this.suscripcionActual = actualizada;
        this.estado = 'Cancelado';
      },
      error: (err) => console.error('Error al cancelar', err)
    });
  }

  renovar(): void {
    if (!this.suscripcionActual) return;

    const hoy = new Date();
    const nuevaFin = new Date();
    nuevaFin.setFullYear(hoy.getFullYear() + 1);  // por ejemplo, 1 año

    const actualizada: Suscripcion = {
      ...this.suscripcionActual,
      estado: 'ACTIVA',
      fechaInicio: this.toLocalDateString(hoy),
      fechaFin: this.toLocalDateString(nuevaFin)
    };

    this.suscripcionService.actualizar(actualizada).subscribe({
      next: () => {
        this.suscripcionActual = actualizada;
        this.estado = 'Activo';
        this.inicio = hoy;
        this.fin = nuevaFin;

        // si igual quieres ir a Pagos, lo dejas
        this.router.navigate(['/pagos']);
      },
      error: (err) => console.error('Error al renovar', err)
    });
  }
}
