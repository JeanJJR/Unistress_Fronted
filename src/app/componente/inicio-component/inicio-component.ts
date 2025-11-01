import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-inicio-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css',
})
export class InicioComponent {
  navigationLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: '¿Cómo te ayudamos?', href: '#como-ayudamos' },
    { label: 'Sobre nosotros', href: '#sobre-nosotros' },
  ];

}
