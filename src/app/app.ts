import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  navigationLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: '¿Cómo te ayudamos?', href: '#como-ayudamos' },
    { label: 'Sobre nosotros', href: '#sobre-nosotros' },
  ];
}
