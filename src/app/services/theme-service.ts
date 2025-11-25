// src/app/services/theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private tema: 'claro' | 'oscuro' = (localStorage.getItem('tema') as 'claro' | 'oscuro') || 'claro';
  private fontSize = parseInt(localStorage.getItem('fontSize') || '16');

  constructor() {
    this.applyTheme();
    this.applyFontSize();
  }

  setTheme(nuevoTema: 'claro' | 'oscuro') {
    this.tema = nuevoTema;
    localStorage.setItem('tema', nuevoTema);
    this.applyTheme();
  }

  setFontSize(size: number) {
    this.fontSize = Math.min(Math.max(size, 12), 24); // límite entre 12 y 24px
    localStorage.setItem('fontSize', this.fontSize.toString());
    this.applyFontSize();
  }

  private applyTheme() {
    document.body.classList.remove('tema-claro', 'tema-oscuro');
    document.body.classList.add(this.tema === 'oscuro' ? 'tema-oscuro' : 'tema-claro');
  }

  private applyFontSize() {
    document.documentElement.style.setProperty('--font-size', `${this.fontSize}px`);
  }

  get currentTheme() { return this.tema; }
  get currentFontSize() { return this.fontSize; }
}
