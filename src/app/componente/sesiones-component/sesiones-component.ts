import {ChangeDetectionStrategy, Component, inject, NgModule, ViewChild} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'; // Para la tabla
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatepickerInput} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Sesion} from '../../model/sesion';
import {MatSort} from '@angular/material/sort';
import {DatePipe} from '@angular/common';
import {SessionService} from '../../services/sesion-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sesiones-component',
  providers:[provideNativeDateAdapter()],
  imports: [MatCardModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatTableModule, MatIconModule, MatDatepickerModule, MatDatepickerInput, DatePipe],
  templateUrl: './sesiones-component.html',
  styleUrl: './sesiones-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SesionesComponent {
  listahistorialsesiones: Sesion[]
  displayedColumnsHistory: string[] = ['id', 'fecha', 'hora', 'observaciones', 'mensaje', 'estado']
  dataSourceHistory: MatTableDataSource<Sesion>=new MatTableDataSource<Sesion>();

  @ViewChild(MatSort) sort: MatSort;
  sesionService: SessionService = inject(SessionService);
  route : Router = inject(Router);
  estudianteId: number = 2;
  constructor() {}
  ngAfterViewInit() {
    this.dataSourceHistory.sort = this.sort;
  }
  ngOnInit() {
    console.log('Component ngOnInit llamando al API Get');
    this.cargarHistorialSesiones (this.estudianteId);
  }
  cargarHistorialSesiones(id: number) {
    this.sesionService.listhistorialporestudiante(id).subscribe({
      next: (data: Sesion[]) => {
        this.dataSourceHistory.data = data.filter(sesion => {
          const SesionDateTime = new Date(sesion.fecha);
          return SesionDateTime < new Date();
        });
        console.log("API Historial trae:", this.dataSourceHistory.data);
      },
      error: (err) => {
        console.error('Error al cargar el historial de sesiones:', err);
      }
    });
  }
}

