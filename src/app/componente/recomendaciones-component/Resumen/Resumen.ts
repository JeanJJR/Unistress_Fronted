import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {Recomendacion} from '../../../model/recomendacion';

@Component({
  selector: 'app-resumen-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './Resumen.html',
  styleUrl: './Resumen.css',
})
export class Resumen {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Recomendacion) {}
}
