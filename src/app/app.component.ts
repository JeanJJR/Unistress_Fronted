import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Bienvenido a Unistress</h1>
    <nav>
      <a routerLink="/banco" style="margin-right: 12px;">Banco de Preguntas</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
