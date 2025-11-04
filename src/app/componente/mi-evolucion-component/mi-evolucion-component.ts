import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-mi-evolucion',
  templateUrl: './mi-evolucion-component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./mi-evolucion-component.css']
})
export class MiEvolucionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartEvolucion', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  fechaInicial: string = '';
  fechaFinal: string = '';

  private datosEjemplo = {
    labels: ['18 Sep', '19 Sep', '20 Sep', '21 Sep', '22 Sep', '23 Sep', '24 Sep', '25 Sep', '26 Sep', '27 Sep', '28 Sep', '29 Sep', '30 Sep', '01 Oct', '02 Oct', '03 Oct', '04 Oct', '05 Oct', '06 Oct', '07 Oct', '08 Oct', '09 Oct', '10 Oct', '11 Oct', '12 Oct', '13 Oct'],
    datasets: [
      { label: 'Feliz', data: [7, 5, 8, 3, 2, 9, 7, 5, 4, 3, 2, 1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 8, 0, 0], backgroundColor: '#4caf50' },
      { label: 'Estresado', data: [5, 6, 4, 8, 6, 3, 5, 7, 9, 8, 7, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 8], backgroundColor: '#ff9800' },
      { label: 'Ansioso', data: [2, 1, 3, 1, 0, 1, 2, 3, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 9, 9], backgroundColor: '#2196f3' },
      { label: 'Calmado', data: [3, 2, 1, 0, 7, 5, 6, 4, 2, 1, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0], backgroundColor: '#ffeb3b' },
      { label: 'Enojado', data: [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], backgroundColor: '#f44336' },
      { label: 'Triste', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], backgroundColor: '#00bcd4' },
    ]
  };

  ngAfterViewInit(): void {
    setTimeout(() => this.generarGrafico(), 50);
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private generarGrafico(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.datosEjemplo,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, beginAtZero: true, grid: { display: true, color: '#e0e0e0' } }
        }
      }
    });
  }
}
