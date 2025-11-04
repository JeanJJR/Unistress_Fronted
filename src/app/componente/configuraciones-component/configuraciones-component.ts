import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuraciones-component',
  standalone: true,
  imports: [],
  templateUrl: './configuraciones-component.html',
  styleUrls: ['./configuraciones-component.css']
})
export class ConfiguracionesComponent implements OnInit {
  tema = 'claro';
  fontSize = 16;

  ngOnInit(): void {
    this.tema = localStorage.getItem('tema') || 'claro';
    this.fontSize = parseInt(localStorage.getItem('fontSize') || '16');
    this.aplicarTema();
    this.aplicarTamañoFuente();
  }

  cambiarTema(nuevoTema: 'claro' | 'oscuro'): void {
    this.tema = nuevoTema;
    localStorage.setItem('tema', nuevoTema);
    this.aplicarTema();
  }

  aplicarTema(): void {
    if (this.tema === 'oscuro') {
      document.body.classList.add('tema-oscuro');
    } else {
      document.body.classList.remove('tema-oscuro');
    }
  }

  ajustarFuente(delta: number): void {
    this.fontSize = Math.min(Math.max(this.fontSize + delta, 12), 24);
    localStorage.setItem('fontSize', this.fontSize.toString());
    this.aplicarTamañoFuente();
  }

  aplicarTamañoFuente(): void {
    document.documentElement.style.fontSize = `${this.fontSize}px`;
  }

  contactarSoporte(): void {
    window.location.href = 'mailto:soporte@unistress.app';
  }

  constructor(private router: Router) {}
}
