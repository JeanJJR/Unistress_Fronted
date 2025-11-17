// src/app/componente/iniciar-sesion-component/iniciar-sesion-component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/iniciar-sesion';

@Component({
  selector: 'app-iniciar-sesion-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './iniciar-sesion-component.html',
  styleUrls: ['./iniciar-sesion-component.css']
})
export class IniciarSesionComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.username || !this.password) {
      this.error = 'Completa todos los campos';
      return;
    }

    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        // 🔧 Ya se limpia en el servicio, aquí solo guardas el rol adicional
        localStorage.setItem('role', res.roles[0]);
        this.redirigirPorRol(res.roles[0]);
      },
      error: (err) => {
        console.error('Error de login:', err);
        this.error = 'Credenciales inválidas';
      }
    });

  }

  private redirigirPorRol(role: string): void {
    if (role === 'ROLE_ADMIN') {
      this.router.navigate(['/admin-perfiles']);
    } else if (role === 'ROLE_PSICOLOGO') {
      this.router.navigate(['/perfil-psicologo']);
    } else if (role === 'ROLE_ESTUDIANTE') {
      this.router.navigate(['/perfil']);
    } else {
      this.router.navigate(['/']);
    }
  }
}

