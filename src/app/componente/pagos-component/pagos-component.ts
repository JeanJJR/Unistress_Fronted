// src/app/componente/pagos-component/pagos-component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Pago } from '../../model/pago';

type PlanId = 'basic' | 'premium';
type Metodo = 'card' | 'yape' | null;

interface Plan {
  id: PlanId;
  titulo: string;
  subtitulo: string;  // (1 mes), etc.
  precio: number;     // PEN
  igv: number;
  features: string[];
}

import { SuscripcionService } from '../../services/suscripcion-service';
import { PagoService } from '../../services/pago-service';
import { Suscripcion } from '../../model/suscripcion';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pagos-component',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './pagos-component.html',
  styleUrl: './pagos-component.css',
})
export class PagosComponent implements OnInit {

  planes: Plan[] = [
    {
      id: 'basic',
      titulo: 'Básico',
      subtitulo: '(1 mes)',
      precio: 19.90,
      igv: 0,
      features: ['2 sesiones/mes', 'Historial básico', 'Recordatorios por email'],
    },
    {
      id: 'premium',
      titulo: 'Premium',
      subtitulo: '(1 mes)',
      precio: 29.90,
      igv: 0,
      features: ['Sesiones ilimitadas', 'Acceso a especialistas', 'Prioridad de atención'],
    },
  ];

  // plan seleccionado y método seleccionado del plan activo
  selected = signal<PlanId | null>(null);
  metodo   = signal<Metodo>(null); // del plan activo

  // suscripción activa del usuario
  suscripcionActiva: Suscripcion | null = null;
  usuarioId: number =Number(localStorage.getItem('userId'));

  loading = false;
  error: string | null = null;
  mensajeOk: string | null = null;

  // mapa simple de método → id en tabla metodo_pago
  // AJUSTA ESTOS IDs a lo que tengas en tu BD (1: tarjeta, 2: yape/plin, por ejemplo)
  private metodoPagoMap: { [k in Exclude<Metodo, null>]: number } = {
    card: 1,
    yape: 2,
  };

  constructor(
    private suscripcionService: SuscripcionService,
    private pagoService: PagoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usuarioId = Number(localStorage.getItem('userId')) || 0;
    if (!this.usuarioId) {
      this.error = 'No se encontró el usuario logueado.';
      return;
    }
    this.cargarSuscripcionActiva();
  }

  total(p: Plan) { return p.precio + p.igv; }

  seleccionar(planId: PlanId) {
    const prev = this.selected();
    this.selected.set(planId);
    if (prev !== planId) this.metodo.set(null);
  }

  elegirMetodo(m: Exclude<Metodo, null>) {
    if (!this.selected()) return;
    this.metodo.set(m);
  }

  private cargarSuscripcionActiva(): void {
    this.loading = true;
    this.suscripcionService.getPorUsuario(this.usuarioId).subscribe({
      next: (suscripciones: Suscripcion[]) => {
        const activa = suscripciones.find(s => s.estado === 'ACTIVA');
        this.suscripcionActiva = activa ?? null;
        if (!this.suscripcionActiva) {
          this.error = 'No tienes una suscripción activa. Primero crea una suscripción.';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando suscripciones', err);
        this.error = 'No se pudo cargar la suscripción.';
        this.loading = false;
      }
    });
  }

  confirmar(plan: Plan) {
    this.mensajeOk = null;
    this.error = null;

    const planId = this.selected();
    const metodo = this.metodo();

    if (!(planId === plan.id && metodo)) return;
    if (!this.suscripcionActiva) {
      this.error = 'No hay una suscripción activa.';
      return;
    }

    const suscripcionActualizada: Suscripcion = {
      ...this.suscripcionActiva,
      tipo: planId === 'basic' ? 'BASICA' : 'PREMIUM',
      estado: 'ACTIVA'
    };

    this.loading = true;

    this.suscripcionService.actualizar(suscripcionActualizada).subscribe({
      next: () => {
        // Registrar pago
        const metodoPagoId = this.metodoPagoMap[metodo];
        const hoy = new Date().toISOString().substring(0, 10);
        const body: Pago = {
          suscripcionId: this.suscripcionActiva!.id!,
          metodoPagoId: metodoPagoId,
          monto: this.total(plan),
          fechaPago: hoy,
          estado: 'PAGADO',
        };

        this.pagoService.registrar(body).subscribe({
          next: () => {
            this.mensajeOk = 'Suscripción y pago actualizados.';
            this.loading = false;
            this.cargarSuscripcionActiva();
            this.snackBar.open(' Suscripción y pago actualizados correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          },
          error: (err) => {
            console.error('Error en pago:', err);
            this.error = 'Suscripción actualizada, pero el pago falló.';
            this.loading = false;
            this.snackBar.open(' Suscripción actualizada, pero el pago falló', 'Cerrar', {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        });
      },
      error: (err) => {
        console.error('Error al actualizar suscripción:', err);
        this.error = 'No se pudo actualizar la suscripción.';
        this.loading = false;
      }
    });
  }}
