import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './iniciar-sesion-component.html',
  styleUrls: ['./iniciar-sesion-component.css'], // 👈 plural
})
export class IniciarSesionComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) return;

    // Aquí podrías llamar a tu backend y guardar el token/usuario.
    // Por ahora, navega a la pantalla principal del estudiante:
    this.router.navigate(['/perfil']);
  }
}
