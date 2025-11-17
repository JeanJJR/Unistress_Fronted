import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BancoPregunta } from '../../model/banco-pregunta';
import { BancoPreguntaService } from '../../services/banco-pregunta.service';
import { TestEmocionalService } from '../../services/test-emocional-service';
import { TestEmocional } from '../../model/test-emocional';

@Component({
  selector: 'app-test-emocional-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './test-emocional-component.html',
  styleUrls: ['./test-emocional-component.css'],
})
export class TestEmocionalComponent implements OnInit {

  ESTUDIANTE_ID = Number(localStorage.getItem('userId'));
  private readonly NUM_PREGUNTAS = 5;

  private bancoPreguntaService = inject(BancoPreguntaService);
  private testEmocionalService = inject(TestEmocionalService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  preguntasTest: BancoPregunta[] = [];
  testForm: FormGroup;
  isLoading = true;
  isSubmitting = false;

  opcionesRespuesta = [
    { label: 'En desacuerdo', value: 1 },
    { label: '', value: 2 },
    { label: 'Neutral', value: 3 },
    { label: '', value: 4 },
    { label: 'De acuerdo', value: 5 }
  ];

  constructor() {
    this.testForm = this.fb.group({
      respuestas: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.cargarPreguntasAleatorias();
  }

  get respuestas(): FormArray {
    return this.testForm.get('respuestas') as FormArray;
  }

  cargarPreguntasAleatorias(): void {
    this.isLoading = true;

    this.bancoPreguntaService.listar().subscribe({
      next: (todasLasPreguntas) => {

        const preguntasBarajadas = todasLasPreguntas.sort(() => 0.5 - Math.random());

        this.preguntasTest = preguntasBarajadas.slice(0, this.NUM_PREGUNTAS);

        this.preguntasTest.forEach(() => {
          this.respuestas.push(this.fb.control(null, Validators.required));
        });

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar preguntas del banco:', err);
        this.isLoading = false;
        this.showMessage('No se pudieron cargar las preguntas del test.', 'error');
      }
    });
  }

  onSubmit(): void {
    if (this.testForm.invalid) {
      this.showMessage('Por favor, responde todas las preguntas.', 'error');
      return;
    }

    this.isSubmitting = true;

    const testPayload: TestEmocional = {
      id: 0,
      usuarioId: this.ESTUDIANTE_ID,
      fecha: new Date().toISOString().split('T')[0],
      puntajeTotal: 0,
      nivelEstres: '',
      preguntas: this.preguntasTest.map((pregunta, index) => {
        return {
          id: 0,
          pregunta: pregunta.enunciado,
          respuesta: '',
          puntaje: this.respuestas.at(index).value
        };
      })
    };

    this.testEmocionalService.resolver(testPayload).subscribe({
      next: (testResuelto) => {
        this.isSubmitting = false;
        this.showMessage(`Test enviado. Tu puntaje es: ${testResuelto.puntajeTotal} (${testResuelto.nivelEstres})`, 'success');

        this.testForm.reset();
        this.respuestas.clear();
        this.cargarPreguntasAleatorias();
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Error al enviar el test:', err);
        this.showMessage('Hubo un error al enviar tu test.', 'error');
      }
    });
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}
