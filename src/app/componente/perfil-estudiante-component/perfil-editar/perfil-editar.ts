import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfilDetalle } from '../../../model/perfil-detalle';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-perfil-editar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOption,
    MatSelect
  ],
  templateUrl: './perfil-editar.html',
  styleUrls: ['./perfil-editar.css']
})

export class PerfilEditarComponent {
  perfil: PerfilDetalle;
  nuevaContrasena: string = '';
  universidades = ['UPC', 'UNI', 'PUCP', 'USIL'];
  carreras = ['Ingeniería de Sistemas', 'Ingeniería de Software', 'Psicología', 'Medicina'];
  ciclos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  estados = ['Regular', 'Irregular', 'Egresado'];


  constructor(
    public dialogRef: MatDialogRef<PerfilEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { perfil: PerfilDetalle }
  ) {
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
