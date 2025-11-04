import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './tendencias-emocionales-component.html',
  styleUrls: ['./tendencias-emocionales-component.css'], // <-- plural
})
export class TendenciasEmocionalesComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;
  private chart!: any;

  // Datos demo
  private rows: SampleRow[] = [
    { date: '2025-09-01', values: { Alegría: 3, Tristeza: 1, Miedo: 0, Ira: 1, Sorpresa: 2, Neutral: 1 } },
    { date: '2025-09-05', values: { Alegría: 1, Tristeza: 0, Miedo: 1, Ira: 0, Sorpresa: 1, Neutral: 2 } },
    { date: '2025-09-10', values: { Alegría: 0, Tristeza: 2, Miedo: 1, Ira: 1, Sorpresa: 0, Neutral: 1 } },
    { date: '2025-09-15', values: { Alegría: 4, Tristeza: 0, Miedo: 1, Ira: 0, Sorpresa: 3, Neutral: 0 } },
    { date: '2025-09-20', values: { Alegría: 2, Tristeza: 1, Miedo: 0, Ira: 2, Sorpresa: 0, Neutral: 3 } },
    { date: '2025-09-25', values: { Alegría: 1, Tristeza: 2, Miedo: 1, Ira: 0, Sorpresa: 1, Neutral: 2 } },
    { date: '2025-09-30', values: { Alegría: 3, Tristeza: 1, Miedo: 2, Ira: 1, Sorpresa: 0, Neutral: 1 } },
  ];

  emotions: Emotion[] = ['Alegría', 'Tristeza', 'Miedo', 'Ira', 'Sorpresa', 'Neutral'];

  startDate = this.rows[0].date;
  endDate   = this.rows[this.rows.length - 1].date;

  ngAfterViewInit() {
    this.buildChart();
  }

  onFilterChange() {
    if (this.startDate && this.endDate && this.startDate > this.endDate) return;
    this.updateChart();
  }

  private buildChart() {
    const ctx = this.chartRef.nativeElement.getContext('2d')!;
    const { labels, datasets } = this.computeDatasets();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: false },
          y: { beginAtZero: true, ticks: { precision: 0 } },
        },
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { mode: 'index', intersect: false },
        },
      },
    });
  }

  private updateChart() {
    const { labels, datasets } = this.computeDatasets();
    this.chart.data.labels = labels;
    this.chart.data.datasets = datasets;
    this.chart.update();
  }

  private computeDatasets() {
    const filtered = this.rows.filter(
      r => (!this.startDate || r.date >= this.startDate) &&
        (!this.endDate   || r.date <= this.endDate)
    );

    const labels = filtered.map(r => r.date);

    const color: Record<Emotion, string> = {
      Alegría: '#4CAF50',
      Tristeza: '#2196F3',
      Miedo: '#FF9800',
      Ira: '#E53935',
      Sorpresa: '#9C27B0',
      Neutral: '#607D8B',
    };

    const datasets = this.emotions.map(em => ({
      label: em,
      data: filtered.map(r => r.values[em] ?? 0),
      backgroundColor: color[em],
      borderRadius: 4,
      maxBarThickness: 28,
    }));

    return { labels, datasets };
  }
}
