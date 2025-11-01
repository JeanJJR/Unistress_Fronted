import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './iniciar-sesion-component.html',
  styleUrl: './iniciar-sesion-component.css',
})
export class IniciarSesionComponent {

}
