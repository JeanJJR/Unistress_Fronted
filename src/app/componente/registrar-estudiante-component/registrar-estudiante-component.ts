// src/app/registrar-estudiante/registrar-estudiante.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { EstudianteService } from '../../services/estudiante-service';
import { Estudiante } from '../../model/estudiante';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-registrar-estudiante-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCard
  ],
  templateUrl: './registrar-estudiante-component.html',
  styleUrls: ['./registrar-estudiante-component.css']
})
export class RegistrarEstudianteComponent {
  estudiante: Estudiante = {
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    telefono: '',
    universidad: '',
    carrera: '',
    ciclo: '',
    estadoAcademico: ''
  };

  universidades = ['UPC', 'UNI', 'PUCP', 'USIL'];
  carreras = ['Ingeniería de Sistemas', 'Ingeniería de Software', 'Psicología', 'Medicina'];
  ciclos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  estados = ['Regular', 'Irregular', 'Egresado'];

  constructor(private estudianteService: EstudianteService) {}

  onSubmit(): void {
    if (this.estudiante.contrasena.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    this.estudianteService.registrar(this.estudiante).subscribe({
      next: () => {
        alert('Estudiante registrado correctamente');
        // Opcional: redirigir al login
        window.location.href = '/iniciar-sesion';
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Error al registrar el estudiante');
      }
    });
  }
}
