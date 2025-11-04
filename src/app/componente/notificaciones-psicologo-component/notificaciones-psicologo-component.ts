import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table'; // Para la tabla
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-notificaciones-psicologo-component',
  imports: [MatFormFieldModule, MatTableModule,MatButtonModule],
  templateUrl: './notificaciones-psicologo-component.html',
  styleUrl: './notificaciones-psicologo-component.css',
})
export class NotificacionesPsicologoComponent {

}
