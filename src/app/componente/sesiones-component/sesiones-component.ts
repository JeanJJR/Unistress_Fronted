import {ChangeDetectionStrategy, Component, inject, NgModule, OnInit, ViewChild} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule, MatDatepickerInputEvent} from '@angular/material/datepicker'; // Importar MatDatepickerInputEvent
import {MatDatepickerInput} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {Sesion} from '../../model/sesion';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {DatePipe} from '@angular/common';
import {SessionService} from '../../services/sesion-service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsuarioService} from '../../services/usuario-servicio';
import {Usuario} from '../../model/usuario';

@Component({
  selector: 'app-sesiones-component',
  providers:[provideNativeDateAdapter()],
  imports: [MatCardModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatTableModule, MatIconModule, MatDatepickerModule, MatDatepickerInput, DatePipe, ReactiveFormsModule, MatSort, MatSortHeader],
  templateUrl: './sesiones-component.html',
  styleUrl: './sesiones-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SesionesComponent {

  sesionService = inject(SessionService);
  route: Router = inject(Router);

  estudianteId: number = 2;

  //Historial de sesiones
  listhistorialporestudiante: Sesion[]=[];
  displayedColumnsHistory: string[] = ['id', 'fecha', 'hora', 'psicologo', 'mensaje', 'estado']
  dataSourceHistory: MatTableDataSource<Sesion> = new MatTableDataSource<Sesion>();
  @ViewChild(MatSort) sort: MatSort;

  //Formulario de sesiones:
  sesionForm: FormGroup;
  fb = inject(FormBuilder);
  usuarioService :UsuarioService = inject(UsuarioService);
  listarpsicologos: Usuario[] = [];
  allSesion: Sesion[] = [];

  // Tabla: Próximas sesiones
  displayedColumnsUpcoming: string[] = ['id', 'fecha', 'hora', 'psicologo', 'mensaje', 'estado', 'acciones'];
  dataSourceUpcoming: MatTableDataSource<Sesion> = new MatTableDataSource<Sesion>();
  @ViewChild(MatSort) sort1: MatSort;

  // Filtros para próximas sesiones
  startDate: Date | null = null;
  endDate: Date | null = null;

  //psciologo: Usuario = new Usuario();

  constructor() {
    this.sesionForm = this.fb.group({
      mensaje: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      psicologo: [null, Validators.required],
    })
  }

  ngOnInit() {
    //Cargar psicologos en el combobox
    this.loadLista();

    //Cargar  sesiones
    this.cargarSesiones();

  }

  ngAfterViewInit() {
    this.dataSourceHistory.sort = this.sort;
    this.dataSourceUpcoming.sort = this.sort1;
  }

  loadLista() {
    this.usuarioService.listarpsicologos().subscribe({
      next: (data: Usuario[]) => {
        this.listarpsicologos = data;
        console.log("Psicologos cargados", data);
      },
      error: (error) => {
        console.log("Error cargando psicólogos:",error);
      }
    });
  }

  cargarSesiones() {
    this.sesionService.listhistorialporestudiante(this.estudianteId).subscribe({
      next: (data: Sesion[]) => {
        this.allSesion = data;
        console.log("API Sesiones trae:", this.allSesion);
        this.actualizarTablas(); // Distribuir datos a las dos tablas

      },
      error: (err) => {
        console.error('Error al cargar sesiones:', err);
      }
    });
  }

  // Distribuye las sesiones a la tabla de Historial y Próximas
  actualizarTablas() {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Comparar solo por fecha

    // Historial (sesiones pasadas)
    this.dataSourceHistory.data = this.allSesion.filter(sesion => {
      const sesionDate = new Date(sesion.fecha);
      return sesionDate < now || sesion.estado === 'CANCELADA';
    });

    // Próximas (sesiones de hoy en adelante)
    let upcoming = this.allSesion.filter(sesion => {
      const sesionDate = new Date(sesion.fecha);
      return sesionDate >= now && (sesion.estado === 'PENDIENTE' || sesion.estado === 'ACEPTADA');
    });

    // Aplicar filtros de fechas que si existen
    if (this.startDate) {
      upcoming = upcoming.filter(s => new Date(s.fecha) >= this.startDate!);
    }
    if (this.endDate) {
      const inclusiveEndDate = new Date(this.endDate);
      inclusiveEndDate.setHours(23, 59, 59, 999); // Incluir todo el día de fin
      upcoming = upcoming.filter(s => new Date(s.fecha) <= inclusiveEndDate);
    }

    this.dataSourceUpcoming.data = upcoming;

    this.dataSourceHistory._updateChangeSubscription();
    this.dataSourceUpcoming._updateChangeSubscription();
  }

  onFilterDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === 'start') {
      this.startDate = event.value;
    } else {
      this.endDate = event.value;
    }
    this.actualizarTablas(); // Re-filtrar los datos
  }



  onSubmit() {
    if (this.sesionForm.valid) {

      const sesion = {
        fecha: this.sesionForm.value.fecha,
        hora: this.sesionForm.value.hora,
        mensaje: this.sesionForm.value.mensaje,
        estado: 'PENDIENTE',
        psicologoId: this.sesionForm.value.psicologo,
        estudianteId: this.estudianteId
      };

      console.log("Datos a enviar (DTO):", sesion);

      this.sesionService.crearsesion(sesion).subscribe({
        next: (data: Object) => {
          alert("Sesión registrada exitosamente");
          this.cargarSesiones();
          this.sesionForm.reset(); // Limpiar formulario
        },
        error: (err) => {
          console.error("Error al registrar sesión:", err);
          alert("Error al registrar: " + (err.error?.message || err.message));
        }
      });
    } else {
      alert("Por favor, complete todos los campos requeridos.");
    }
  }

  getPsicologoNombre(id: number): string {
    const psicologo = this.listarpsicologos.find(p => p.id === id);
    return psicologo ? `${psicologo.nombre} ${psicologo.apellidos}` : 'No encontrado';
  }

  onCancel(sesion: Sesion) {
    if (confirm(`¿Estás seguro de que deseas cancelar la sesión #${sesion.id}?`)) {
      this.sesionService.cancelarSesion(sesion.id, this.estudianteId).subscribe({
        next: (response) => {
          alert(response); // Muestra "Sesión cancelada correctamente"
          this.cargarSesiones(); // Recarga los datos
        },
        error: (err) => {
          console.error("Error al cancelar sesión:", err);
          alert("Error al cancelar: " + (err.error?.message || err.message));
        }
      });
    }
  }

}

