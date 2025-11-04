import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notificacion {
  fecha: string;
  emisor: string;
  tipo: string;
  mensaje: string;
}

@Component({
  selector: 'app-notificaciones-estudiante',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones-component.html',
  styleUrls: ['./notificaciones-component.css']
})
export class NotificacionesEstudianteComponent {
  estadoActivado = false;

  notificaciones: Notificacion[] = [
    { fecha: '2025-11-04', emisor: 'Sistema', tipo: 'Info', mensaje: 'Tu sesión de hoy inicia a las 3 PM' },
    { fecha: '2025-11-03', emisor: 'Psicólogo', tipo: 'Recordatorio', mensaje: 'Completa tu test emocional' }
  ];

  toggleEstado() {
    this.estadoActivado = !this.estadoActivado;
  }
}
