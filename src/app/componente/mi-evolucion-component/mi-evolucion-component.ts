import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import Chart, {BubbleDataPoint} from 'chart.js/auto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EvolucionEmocion } from '../../model/evolucion-emocion';
import { TendenciaEmocionalService } from '../../services/tendencia-emocional-service';
import 'chartjs-adapter-date-fns';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-mi-evolucion',
  standalone: true,
  imports: [FormsModule, CommonModule,    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './mi-evolucion-component.html',
  styleUrls: ['./mi-evolucion-component.css']
})
export class MiEvolucionComponent implements OnDestroy {
  @ViewChild('chartEvolucion', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  fechaInicial: Date | null = null;
  fechaFinal: Date | null = null;
  tipoGrafico: string = 'bar'; // 'bar', 'pie', 'scatter'
  usuarioId = Number(localStorage.getItem('userId'));
  datos: EvolucionEmocion[] = [];

  constructor(private tendenciaService: TendenciaEmocionalService) {}

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  cargarEvolucion(): void {
    if (!this.fechaInicial || !this.fechaFinal) {
      alert('Debes seleccionar un rango de fechas');
      return;
    }


    const inicioStr = this.formatDate(this.fechaInicial) + 'T00:00:00';
    const finStr = this.formatDate(this.fechaFinal) + 'T23:59:59';

    this.tendenciaService.listarEvolucion(this.usuarioId, inicioStr, finStr).subscribe({
      next: (data) => {
        this.datos = data;
        this.generarGrafico();
      },
      error: (err) => {
        console.error('Error al cargar evolución:', err);
        alert('No se pudo cargar la evolución');
      }
    });
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  generarGrafico(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 🔑 destruye cualquier gráfico previo en este canvas
    Chart.getChart(ctx)?.destroy();
    this.chart?.destroy();
    this.chart = undefined;

    const emocionesUnicas = [...new Set(this.datos.map(d => d.emocion))];
    const labels = [...new Set(this.datos.map(d => d.fecha))];

    if (this.tipoGrafico === 'scatter') {
      // datasets para scatter
      const datasets = emocionesUnicas.map(emocion => ({
        type: 'scatter' as const,
        label: emocion,
        data: this.datos
          .filter(d => d.emocion === emocion)
          .map(d => ({
            x: new Date(d.fecha).getTime(),
            y: d.nivel
          } as BubbleDataPoint)),
        backgroundColor: this.colorPorEmocion(emocion)
      }));

      this.chart = new Chart<'scatter', BubbleDataPoint[], string>(ctx, {
        type: 'scatter',
        data: { datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: true } },
          scales: {
            x: {
              type: 'time',
              time: { unit: 'day' },
              title: { display: true, text: 'Fecha' }
            },
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Nivel' }
            }
          }
        }
      });
    } else if (this.tipoGrafico === 'pie') {
      // datasets para pie chart (torta)
      const datasets = [{
        label: 'Emociones',
        data: emocionesUnicas.map(emocion =>
          this.datos
            .filter(d => d.emocion === emocion)
            .reduce((acc, d) => acc + d.nivel, 0) // suma de niveles por emoción
        ),
        backgroundColor: emocionesUnicas.map(e => this.colorPorEmocion(e))
      }];

      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: emocionesUnicas,
          datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true, position: 'right' }
          }
        }
      });
    } else {
      // datasets para bar chart
      const datasets = emocionesUnicas.map(emocion => ({
        label: emocion,
        data: labels.map(fecha => {
          const registro = this.datos.find(d => d.fecha === fecha && d.emocion === emocion);
          return registro ? registro.nivel : 0;
        }),
        backgroundColor: this.colorPorEmocion(emocion)
      }));

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: true } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }
  }
  private colorPorEmocion(emocion: string): string {
    switch (emocion) {
      case 'feliz': return '#4caf50';
      case 'triste': return '#00bcd4';
      case 'enojado': return '#f44336';
      case 'ansioso': return '#2196f3';
      case 'neutral': return '#9e9e9e';
      default: return '#ffeb3b';
    }
  }
}
