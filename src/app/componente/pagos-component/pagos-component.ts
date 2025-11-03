import { Component, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
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

@Component({
  selector: 'app-pagos-component',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './pagos-component.html',
  styleUrl: './pagos-component.css',
})
export class PagosComponent {
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

  total(p: Plan) { return p.precio + p.igv; }

  seleccionar(planId: PlanId) {
    // si se cambia de plan,se resetea el método
    const prev = this.selected();
    this.selected.set(planId);
    if (prev !== planId) this.metodo.set(null);
  }

  elegirMetodo(m: Exclude<Metodo, null>) {
    if (!this.selected()) return;
    this.metodo.set(m);
  }

  confirmar(plan: Plan) {
    if (!(this.selected() === plan.id && this.metodo())) return;
    // Aquí iría tu flujo real (checkout/POST). De momento solo log:
    console.log('Confirmar pago', { plan: plan.id, metodo: this.metodo(), total: this.total(plan) });
  }
}
