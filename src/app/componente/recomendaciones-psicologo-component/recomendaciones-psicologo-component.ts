import { Component, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSort } from '@angular/material/sort';

// Models
import { Recomendacion } from '../../model/recomendacion';
import { Usuario } from '../../model/usuario';
import { RegistroEmocional } from '../../model/estado-emocional';

// Services
import { RecomendacionService } from '../../services/recoemendacion-service';
import { UsuarioService } from '../../services/usuario-servicio';
import { RegistroEmocionalService } from '../../services/estado-emocional-service';

@Component({
  selector: 'app-recomendaciones-psicologo-component',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DatePipe,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatRadioGroup,
    MatRadioButton,
    SlicePipe
  ],
  templateUrl: './recomendaciones-psicologo-component.html',
  styleUrl: './recomendaciones-psicologo-component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RecomendacionesPsicologoComponent {

  // 1. CONSTANTE PARA EL ID DEL PSICÓLOGO
  private readonly PSICOLOGO_ID: number = 3;

  recomendacionForm: FormGroup;
  fb = inject(FormBuilder);

  // Listas de datos
  estudiantes: Usuario[] = [];
  registrosEmocionales: RegistroEmocional[] = [];
  isLoadingRegistros = false;

  // Configuración de Tabla
  displayedColumnsRecomendaciones: string[] = ['id', 'nombreEstudiante', 'registroEmocionalId', 'tipo', 'mensaje'];
  dataSourceHistorialRecomendaciones: MatTableDataSource<Recomendacion> = new MatTableDataSource<Recomendacion>();
  @ViewChild(MatSort) sort: MatSort;

  // Inyección de Servicios
  recomendacionService: RecomendacionService = inject(RecomendacionService);
  registroEmocionalService: RegistroEmocionalService = inject(RegistroEmocionalService);
  usuarioService: UsuarioService = inject(UsuarioService);
  route: Router = inject(Router);

  constructor() {
    this.recomendacionForm = this.fb.group({
      estudianteId: [null, Validators.required],
      // Inicia deshabilitado hasta que se elija estudiante
      registroEmocionalId: [{value: null, disabled: true}, Validators.required],
      mensaje: ['', Validators.required],
      tipo: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.cargarHistorialRecomendaciones();
    this.cargarEstudiantes();
    this.setupEstudianteListener();
  }

  ngAfterViewInit() {
    this.dataSourceHistorialRecomendaciones.sort = this.sort;
  }

  cargarEstudiantes() {
    this.usuarioService.listarEstudiantes().subscribe({
      next: (data: Usuario[]) => {
        this.estudiantes = data;
      },
      error: (err) => console.error('Error cargando estudiantes:', err)
    });
  }

  setupEstudianteListener() {
    this.recomendacionForm.get('estudianteId')?.valueChanges.subscribe(estudianteId => {
      // Limpiar selección anterior
      this.registrosEmocionales = [];
      this.recomendacionForm.get('registroEmocionalId')?.setValue(null);

      if (estudianteId) {
        this.recomendacionForm.get('registroEmocionalId')?.enable();
        this.cargarRegistrosPorEstudiante(estudianteId);
      } else {
        // Deshabilitar si no hay selección
        this.recomendacionForm.get('registroEmocionalId')?.disable();
      }
    });
  }

  cargarRegistrosPorEstudiante(estudianteId: number) {
    this.isLoadingRegistros = true;
    this.registroEmocionalService.listarPorUsuario(estudianteId).subscribe({
      next: (data) => {
        this.registrosEmocionales = data;
        this.isLoadingRegistros = false;
      },
      error: (err) => {
        console.error('Error cargando registros emocionales:', err);
        this.isLoadingRegistros = false;
      }
    });
  }

  cargarHistorialRecomendaciones() {
    this.recomendacionService.listarPorPsicologo(this.PSICOLOGO_ID).subscribe({
      next: (data: Recomendacion[]) => {
        this.dataSourceHistorialRecomendaciones.data = data;
        console.log('Historial cargado:', data);
      },
      error: (err) => console.error('Error cargando historial:', err)
    });
  }

  onSubmit() {
    if (this.recomendacionForm.invalid) {
      this.recomendacionForm.markAllAsTouched();
      return;
    }

    const formValue = this.recomendacionForm.value;

    const nuevaRecomendacion: any = {
      id: null,
      mensaje: formValue.mensaje,
      tipo: formValue.tipo,
      registroEmocionalId: formValue.registroEmocionalId,
      usuarioId: this.PSICOLOGO_ID
    };

    console.log('Enviando payload:', nuevaRecomendacion);

    this.recomendacionService.crearRecomendacion(nuevaRecomendacion).subscribe({
      next: (res) => {
        console.log('Guardado exitoso', res);
        alert('¡Recomendación guardada con éxito!');

        this.recomendacionForm.reset();
        // Limpieza de errores visuales
        Object.keys(this.recomendacionForm.controls).forEach(key => {
          this.recomendacionForm.get(key)?.setErrors(null);
        });

        this.registrosEmocionales = [];
        this.recomendacionForm.get('registroEmocionalId')?.disable();

        // Recargar la tabla para ver el nuevo registro
        this.cargarHistorialRecomendaciones();
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        const msg = err.error?.message || 'Error desconocido';
        alert('Error: ' + msg);
      }
    });
  }
}
