import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TendenciaEmocionalService} from '../../services/tendencia-emocional-service';
import {TendenciaEmocional} from '../../model/tendencia-emocional';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';

// Usamos Chart.js por CDN:
declare const Chart: any;

// Tipos que faltaban
type Emotion = 'Alegría' | 'Tristeza' | 'Miedo' | 'Ira' | 'Sorpresa' | 'Neutral';
interface SampleRow {
  date: string;                               // 'YYYY-MM-DD'
  values: Record<Emotion, number>;
}

@Component({
  selector: 'app-tendencias-emocionales-component',
  standalone: true,
  imports: [CommonModule, FormsModule,    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule],
  templateUrl: './tendencias-emocionales-component.html',
  styleUrls: ['./tendencias-emocionales-component.css'], // <-- plural
})
export class TendenciasEmocionalesComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;
  private chart!: any;

  startDate: Date = new Date();
  endDate: Date = new Date();
  emociones: TendenciaEmocional[] = [];

  constructor(private service: TendenciaEmocionalService) {}

  ngAfterViewInit() {
    this.fetchData();
  }

  onFilterChange() {
    if (this.startDate && this.endDate && this.startDate <= this.endDate) {
      this.fetchData();
    }
  }

  private fetchData() {
    const inicio = this.formatDate(this.startDate);
    const fin = this.formatDate(this.endDate);

    this.service.listarTendencias(inicio, fin).subscribe(data => {
      this.emociones = data;
      this.updateChart();
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // → "YYYY-MM-DD"
  }

  private updateChart() {
    const ctx = this.chartRef.nativeElement.getContext('2d')!;
    const labels = this.emociones.map(e => e.emocion);
    const data = this.emociones.map(e => e.promedioNivel);

    const colorMap: Record<string, string> = {
      feliz: '#4CAF50',
      triste: '#2196F3',
      miedo: '#FF9800',
      ira: '#E53935',
      sorpresa: '#9C27B0',
      neutral: '#607D8B',
      ansioso: '#FFC107',
    };

    const backgroundColor = this.emociones.map(e =>
      colorMap[e.emocion.toLowerCase()] || '#999'
    );

    if (!this.chart) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Promedio Nivel Emocional',
            data,
            backgroundColor,
            borderRadius: 4,
            maxBarThickness: 28,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, ticks: { precision: 0 } }
          },
          plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false }
          }
        }
      });
    } else {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.data.datasets[0].backgroundColor = backgroundColor;
      this.chart.update();
    }
  }
}
