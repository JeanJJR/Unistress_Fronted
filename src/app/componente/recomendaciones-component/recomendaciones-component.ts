import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecomendacionService } from '../../services/recoemendacion-service';
import { Recomendacion } from '../../model/recomendacion';
import {MatDialog} from '@angular/material/dialog';
import {Resumen} from './Resumen/Resumen';

@Component({
  selector: 'app-recomendaciones-component',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './recomendaciones-component.html',
  styleUrl: './recomendaciones-component.css',
})
export class RecomendacionesComponent implements OnInit {

  private readonly ESTUDIANTE_ID: number = 2;

  private recomendacionService = inject(RecomendacionService);

  public recomendaciones: Recomendacion[] = [];
  public isLoading = true;

  ngOnInit(): void {
    this.cargarRecomendaciones();
  }

  cargarRecomendaciones(): void {
    this.isLoading = true;
    this.recomendacionService.listarRecomendacionesPorUsuarios(this.ESTUDIANTE_ID).subscribe({
      next: (data) => {
        this.recomendaciones = data;
        this.isLoading = false;
        console.log('Recomendaciones cargadas:', data);
      },
      error: (err) => {
        console.error('Error al cargar recomendaciones:', err);
        this.isLoading = false;
      }
    });
  }
  constructor(private dialog: MatDialog) {}

  verResumen(rec: Recomendacion): void {
    this.dialog.open(Resumen, {
      data: rec,
      width: '500px'
    });
  }

}
