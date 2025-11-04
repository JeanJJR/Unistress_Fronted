import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Question {
  title: string;
  exampleAnswer: string;
}

@Component({
  selector: 'app-banco-preguntas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="banco">
      <h2>Banco de preguntas</h2>

      <div *ngIf="questions.length === 0" class="empty">
        No hay preguntas disponibles.
      </div>

      <ul *ngIf="questions.length > 0" class="list">
        <li *ngFor="let q of questions; let i = index; trackBy: trackByIndex"
            (click)="selectQuestion(i)"
            [class.selected]="selectedIndex === i">
          {{ i + 1 }}. {{ q.title }}
        </li>
      </ul>

      <div *ngIf="selectedQuestion" class="detail">
        <h3>Detalle</h3>
        <p>{{ selectedQuestion.title }}</p>
        <p><strong>Respuesta ejemplo:</strong> {{ selectedQuestion.exampleAnswer }}</p>
      </div>
    </section>
  `,
  styles: [`
    .banco { padding: 12px; font-family: Arial, sans-serif; }
    .list { list-style: none; padding: 0; margin: 8px 0; }
    .list li { padding: 8px; border: 1px solid #ddd; margin-bottom: 6px; cursor: pointer; border-radius: 4px; }
    .list li.selected { background: #eef; border-color: #99c; }
    .empty { color: #666; font-style: italic; }
    .detail { margin-top: 12px; padding: 8px; border-top: 1px solid #eee; }
  `]
})
export class BancoPreguntasComponent {
  questions: Question[] = [
    { title: '¿Cómo maneja situaciones de estrés?', exampleAnswer: 'Respirar, priorizar tareas y pedir apoyo si hace falta.' },
    { title: 'Describe una experiencia clínica relevante.', exampleAnswer: 'Trabajo con adolescentes en terapia cognitivo-conductual...' }
  ];

  selectedIndex: number | null = null;

  get selectedQuestion(): Question | null {
    return this.selectedIndex === null ? null : this.questions[this.selectedIndex];
  }

  selectQuestion(index: number) {
    this.selectedIndex = index;
  }

  trackByIndex(index: number, item: Question): number {
    return index;
  }
}
