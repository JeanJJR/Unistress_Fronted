import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

interface Question {
  title: string;
  exampleAnswer: string;
}

@Component({
  selector: 'app-banco-preguntas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './banco-preguntas.component.html',
  styleUrls: ['./banco-preguntas.component.css']
})
export class BancoPreguntasComponent {
  nuevaPregunta: string = '';
  selectedIndex: number = -1;
  selectedQuestion: Question | null = null;

  preguntas: Question[] = [
    {
      title: '¿Cómo maneja situaciones de estrés?',
      exampleAnswer: 'Respirar, priorizar tareas y pedir apoyo si hace falta.'
    },
    {
      title: 'Describe una experiencia clínica relevante.',
      exampleAnswer: 'Trabajo con adolescentes en terapia cognitivo-conductual...'
    }
  ];

  crearPregunta(): void {
    if (this.nuevaPregunta && this.nuevaPregunta.trim().length > 0) {
      const nuevaPreguntaObj: Question = {
        title: this.nuevaPregunta.trim(),
        exampleAnswer: 'Sin respuesta de ejemplo aún.'
      };

      this.preguntas.push(nuevaPreguntaObj);
      this.nuevaPregunta = '';
      this.selectQuestion(this.preguntas.length - 1);
    }
  }

  selectQuestion(index: number): void {
    this.selectedIndex = index;
    this.selectedQuestion = this.preguntas[index];
  }

  clearSelection(): void {
    this.selectedIndex = -1;
    this.selectedQuestion = null;
  }

  deletePregunta(index: number, event: Event): void {
    event.stopPropagation();
    this.preguntas.splice(index, 1);
    if (this.selectedIndex === index) {
      this.clearSelection();
    } else if (this.selectedIndex > index) {
      this.selectedIndex--;
    }
  }
}
