// src/app/componente/perfil-editar/perfil-editar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfilDetalle } from '../../../model/perfil-detalle';

@Component({
  selector: 'app-perfil-editar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './perfil-editar.html',
  styleUrls: ['./perfil-editar.css']
})
export class PerfilEditarComponent {
  @Input() perfil!: PerfilDetalle;
  @Output() save = new EventEmitter<PerfilDetalle>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.perfil);
  }

  onCancel() {
    this.cancel.emit();
  }
}
