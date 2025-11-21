import {Component, inject, ViewChild} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'; // Para la tabla
import { MatButtonModule } from '@angular/material/button';
import {MatSort} from '@angular/material/sort';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {Notificacion} from '../../model/notificacion';
import {NotificacionService} from '../../services/notificacion-service';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-notificaciones-psicologo-component',
  imports: [MatFormFieldModule, MatTableModule, MatButtonModule, MatSort, MatIcon, MatTooltip, CommonModule],
  templateUrl: './notificaciones-psicologo-component.html',
  styleUrl: './notificaciones-psicologo-component.css',
})
export class NotificacionesPsicologoComponent {

  lista: Notificacion[] = [];
  displayedColumns: string[] = ['fecha', 'tipo', 'mensaje', 'estado', 'accion'];
  NotificacionesDataSource: MatTableDataSource<Notificacion> = new MatTableDataSource<Notificacion>();
  @ViewChild(MatSort) sort: MatSort;
  notificacionesService: NotificacionService = inject(NotificacionService)
  route: Router = inject(Router);

  psicologoid: number =Number(localStorage.getItem('userId'));
  public notificacionesEncendidas: boolean = false;

  constructor() {
    console.log("Constructor")
  }

  ngAfterViewInit() {
    this.NotificacionesDataSource.sort = this.sort;
  }

  ngOnInit() {

  }

  //Notificaciones Encendidas/Apagadas
  estadodenotificaciones(): void {
    this.notificacionesEncendidas = !this.notificacionesEncendidas;
    if (this.notificacionesEncendidas) { // Si se encienden, carga los datos
      this.cargarnotificaciones();
    } else { // Si se apagan, limpia la tabla
      this.NotificacionesDataSource.data = [];
    }
  }

  cargarnotificaciones(): void {
    if (!this.notificacionesEncendidas) return;
    if (this.psicologoid) {
      this.notificacionesService.listarPorUsuario(this.psicologoid).subscribe({
        next: (data) => {
          this.NotificacionesDataSource.data = data;
        },
      });
    } else {
    }
  }

  //Al recargar la página aparece como leída
  marcarComoLeida(notificacion: Notificacion): void {
    if (notificacion.estado === 'LEIDA') return;

    this.notificacionesService.marcarLeida(notificacion.id).subscribe({
      next: () => {
        this.cargarnotificaciones();
      },
      error: (err) => {
        console.error("Error al marcar como leída:", err);
      }
    });
  }
}
