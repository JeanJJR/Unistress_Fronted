// src/app/registrar-psicologo/registrar-psicologo.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { PsicologoService } from '../../services/psicologo-service';
import { Psicologo } from '../../model/psicologo';

@Component({
  selector: 'app-registrar-psicologo-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './registrar-psicologo-component.html',
  styleUrls: ['./registrar-psicologo-component.css']
})
export class RegistrarPsicologoComponent {
  psicologo: Psicologo = {
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    telefono: '',
    especialidad: '',
    colegiatura: '',
    anosExperiencia: 0
  };

  contrasenaConfirmacion = '';
  correoDuplicado = false;


  constructor(private psicologoService: PsicologoService) {
  }

  onSubmit(): void {
    this.correoDuplicado = false;

    if (this.psicologo.contrasena !== this.contrasenaConfirmacion) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (this.psicologo.contrasena.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    const anos = Number(this.psicologo.anosExperiencia);
    if (isNaN(anos) || anos < 0) {
      alert('Años de experiencia debe ser un número válido');
      return;
    }
    this.psicologo.anosExperiencia = anos;

    this.psicologoService.registrar(this.psicologo).subscribe({
      next: () => {
        alert('Psicólogo registrado correctamente');
        window.location.href = '/iniciar-sesion';
      },
      error: (err) => {
        const mensaje = err.error?.message || err.error;
        if (err.status === 400 && mensaje === 'El correo ya está registrado') {
          this.correoDuplicado = true;
        } else {
          alert('Error al registrar el psicólogo');
        }
      }
    });
  }
}
