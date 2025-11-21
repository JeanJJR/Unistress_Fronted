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
    const perfilEnviar: any = {
      nombre: this.perfil.nombre,
      apellidos: this.perfil.apellidos,
      correo: this.perfil.correo,
      telefono: this.perfil.telefono,
      universidad: this.perfil.universidad,
      carrera: this.perfil.carrera,
      ciclo: this.perfil.ciclo,
      estadoAcademico: this.perfil.estadoAcademico,
      especialidad: this.perfil.especialidad,
      colegiatura: this.perfil.colegiatura,
      anosExperiencia: this.perfil.anosExperiencia,
      fotoUrl: this.perfil.fotoUrl,
      descripcion: this.perfil.descripcion
    };

    if (this.nuevaContrasena && this.nuevaContrasena.trim().length > 0) {
      perfilEnviar.contrasena = this.nuevaContrasena.trim();
    }

    this.dialogRef.close(perfilEnviar);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
