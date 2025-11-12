import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Sesion } from '../../../model/sesion';

@Component({
  selector: 'app-resumen-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './resumen-dialog.component.html',
  styleUrls: ['./resumen-dialog.component.css']
})
export class ResumenDialogComponent {

  // Inyecta los datos de la sesión
  constructor(
    public dialogRef: MatDialogRef<ResumenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sesion
  ) {}

  cerrar(): void {
    this.dialogRef.close();
  }
}
