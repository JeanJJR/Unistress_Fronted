import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfilDetalle } from '../../../model/perfil-detalle';

// Angular Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-perfil-editar-psicologo',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './perfil-editar-psicologo.html',
  styleUrls: ['./perfil-editar-psicologo.css'],
})
export class PerfilEditarPsicologoComponent {
  perfil: PerfilDetalle;
  nuevaContrasena: string = '';

  constructor(
    public dialogRef: MatDialogRef<PerfilEditarPsicologoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { perfil: PerfilDetalle }
  ) {
    // Copia para edición segura
    this.perfil = { ...data.perfil };
  }

  onSave() {
    if (this.nuevaContrasena.trim()) {
      this.perfil.contrasena = this.nuevaContrasena;
    }
    this.dialogRef.close(this.perfil);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
