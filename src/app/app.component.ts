// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Bienvenido a Unistress</h1>
    <nav>
      <a routerLink="/banco" style="margin-right: 12px;">Banco de Preguntas</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
