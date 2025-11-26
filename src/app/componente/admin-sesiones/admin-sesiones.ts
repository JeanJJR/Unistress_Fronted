import {Component, inject, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {DatePipe, } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {
  MatTable, MatTableDataSource, MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatCell, MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatNoDataRow
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatDialog} from '@angular/material/dialog';
import {provideNativeDateAdapter} from '@angular/material/core';

import {SessionService} from '../../services/sesion-service';
import {UsuarioService} from '../../services/usuario-servicio';
import {Sesion} from '../../model/sesion';
import {Usuario} from '../../model/usuario';

import {ConfirmDialogo} from './confirm-dialogo/confirm-dialogo';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-admin-sesiones',
  standalone: true,
  imports: [
    MatCard, MatCardHeader, MatCardTitle, MatCardContent,
    MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatNoDataRow,
    MatPaginator, MatSort, MatSortHeader,
    MatFormField, MatLabel, MatInput, MatSuffix,
    MatDatepicker, MatDatepickerInput, MatDatepickerToggle,
     MatIconButton, MatIcon,
    FormsModule, DatePipe, MatTooltip, MatMiniFabButton,
  ],
  templateUrl: './admin-sesiones.html',
  styleUrl: './admin-sesiones.css',
  providers: [provideNativeDateAdapter()]
})
export class AdminSesiones implements OnInit, AfterViewInit {

  private sessionService = inject(SessionService);
  private usuarioService = inject(UsuarioService);
  private dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listarpsicologos: Usuario[] = [];
  listarestudiantes: Usuario[] = [];

  displayedColumnsSesions: string[] = ['id', 'fecha', 'hora', 'estudiante', 'psicologo', 'mensaje', 'estado', 'eliminar'];
  dataSourceSesion = new MatTableDataSource<Sesion>();

  filterStartDate: Date | null = null;
  filterEndDate: Date | null = null;

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarSesiones();
  }

  ngAfterViewInit() {
    this.dataSourceSesion.paginator = this.paginator;
    this.dataSourceSesion.sort = this.sort;
    this.setupFilterPredicate();
  }

  cargarUsuarios() {
    // Cargamos estudiantes
    this.usuarioService.listarEstudiantes().subscribe({
      next: (data) => this.listarestudiantes = data,
      error: (e) => console.error('Error cargando estudiantes', e)
    });

    this.usuarioService.listarpsicologos().subscribe({
      next: (data) => this.listarpsicologos = data,
      error: (e) => console.error('Error cargando psicólogos', e)
    });
  }

  cargarSesiones() {
    this.sessionService.list().subscribe({
      next: (data) => {
        this.dataSourceSesion.data = data;
      },
      error: (e) => console.error('Error cargando sesiones', e)
    });
  }

  setupFilterPredicate() {
    this.dataSourceSesion.filterPredicate = (data: Sesion, filter: string) => {
      if (!this.filterStartDate && !this.filterEndDate) return true;

      const sessionDate = new Date(data.fecha + 'T00:00:00');
      sessionDate.setHours(0,0,0,0);

      let matchStart = true;
      let matchEnd = true;

      if (this.filterStartDate) {
        const start = new Date(this.filterStartDate);
        start.setHours(0,0,0,0);
        matchStart = sessionDate.getTime() >= start.getTime();
      }

      if (this.filterEndDate) {
        const end = new Date(this.filterEndDate);
        end.setHours(0,0,0,0);
        matchEnd = sessionDate.getTime() <= end.getTime();
      }

      return matchStart && matchEnd;
    };
  }

  applyFilter() {
    this.dataSourceSesion.filter = '' + Math.random();
    if (this.dataSourceSesion.paginator) this.dataSourceSesion.paginator.firstPage();
  }

  clearFilters() {
    this.filterStartDate = null;
    this.filterEndDate = null;
    this.dataSourceSesion.filter = '';
  }

  getEstudianteNombre(id: number): string {
    const user = this.listarestudiantes.find(u => u.id === id);
    return user ? `${user.nombre} ${user.apellidos}` : 'Desconocido';
  }

  getPsicologoNombre(id: number): string {
    const user = this.listarpsicologos.find(u => u.id === id);
    return user ? `${user.nombre} ${user.apellidos}` : 'Desconocido';
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogo);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sessionService.delete(id).subscribe({
          next: () => {
            this.dataSourceSesion.data = this.dataSourceSesion.data.filter(s => s.id !== id);
          },
          error: (e) => console.error('Error al eliminar', e)
        });
      }
    });
  }

}
