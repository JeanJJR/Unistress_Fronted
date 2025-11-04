// src/app/componente/banco-preguntas-component/banco-preguntas-component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  title: string;
  exampleAnswer: string;
}

@Component({
  selector: 'app-banco-preguntas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './banco-preguntas.component.html',
  styleUrls: ['./banco-preguntas.component.css']
})
export class BancoPreguntasComponent {
  nuevaPregunta: string = '';

  preguntas: Question[] = [
    { title: '¿Cómo maneja situaciones de estrés?', exampleAnswer: 'Respirar, priorizar tareas y pedir apoyo si hace falta.' },
    { title: 'Describe una experiencia clínica relevante.', exampleAnswer: 'Trabajo con adolescentes en terapia cognitivo-conductual...' }
  ];

  selectedIndex: number | null = null;

  get selectedQuestion(): Question | null {
    return this.selectedIndex === null ? null : this.preguntas[this.selectedIndex];
  }

  selectQuestion(index: number) {
    this.selectedIndex = index;
  }

  crearPregunta() {
    if (this.nuevaPregunta.trim()) {
      this.preguntas.push({ title: this.nuevaPregunta, exampleAnswer: 'Respuesta ejemplo...' });
      this.nuevaPregunta = '';
    }
  }

  trackByIndex(index: number, item: Question): number {
    return index;
  }
}
