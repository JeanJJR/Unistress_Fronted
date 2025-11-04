import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCard} from '@angular/material/card';


@Component({
  selector: 'app-vista-emocional-component',
  imports: [
    MatFormFieldModule, MatInputModule, MatButtonModule, MatCard,
  ],
  templateUrl: './vista-emocional-component.html',
  styleUrl: './vista-emocional-component.css',
})
export class VistaEmocionalComponent {

}
