import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {PerfilDetalleService} from '../../services/perfil-detalle-service';
import {PerfilDetalle} from '../../model/perfil-detalle';
import { NgIf} from '@angular/common';

@Component({
  selector: 'app-perfil-estudiante-component',
  standalone: true,
  imports: [],
  templateUrl: './perfil-estudiante-component.html',
  styleUrl: './perfil-estudiante-component.css',
})
export class PerfilEstudianteComponent implements OnInit {
  perfil: PerfilDetalle | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private perfilService: PerfilDetalleService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const usuarioId = 2;
    //const usuarioId = this.authService.getUsuarioId(); // tú lo implementas
    this.perfilService.obtenerPerfilPorId(usuarioId).subscribe({
      next: (data) => {
        this.perfil = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el perfil';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
