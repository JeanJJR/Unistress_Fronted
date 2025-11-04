import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-historial-sesiones-component',
  imports: [
    MatButtonModule,
    MatCard,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './historial-sesiones-component.html',
  styleUrl: './historial-sesiones-component.css',
})
export class HistorialSesionesComponent {

}
