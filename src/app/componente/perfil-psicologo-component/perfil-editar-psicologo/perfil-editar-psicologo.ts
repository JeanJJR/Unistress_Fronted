import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PerfilDetalle} from '../../../model/perfil-detalle';
import {PerfilEditarComponent} from '../../perfil-estudiante-component/perfil-editar/perfil-editar';

@Component({
  selector: 'app-perfil-editar-psicologo',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './perfil-editar-psicologo.html',
  styleUrl: './perfil-editar-psicologo.css',
})
export class PerfilEditarPsicologoComponent {
  @Input() perfil!: PerfilDetalle;
  @Output() save = new EventEmitter<PerfilDetalle>();
  @Output() cancel = new EventEmitter<void>();
  nuevaContrasena: string = '';
  onSave() {
    if (this.nuevaContrasena.trim()) {
      this.perfil.contrasena = this.nuevaContrasena;
    }
    this.save.emit(this.perfil);
  }

  onCancel() {
    this.cancel.emit();
  }
}
