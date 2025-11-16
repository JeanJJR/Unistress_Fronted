import { Routes } from '@angular/router';
import { InicioComponent } from './componente/inicio-component/inicio-component';
import { IniciarSesionComponent } from './componente/iniciar-sesion-component/iniciar-sesion-component';
import { RegistrarEstudianteComponent } from './componente/registrar-estudiante-component/registrar-estudiante-component';
import { RegistrarPsicologoComponent } from './componente/registrar-psicologo-component/registrar-psicologo-component';
import { LayoutComponent } from './layout/layout';
import { Layout2 } from './layout2/layout2';
import { PerfilEstudianteComponent } from './componente/perfil-estudiante-component/perfil-estudiante-component';
import { TestEmocionalComponent } from './componente/test-emocional-component/test-emocional-component';
import { EstadoEmocionalComponent } from './componente/estado-emocional-component/estado-emocional-component';
import { SesionesComponent } from './componente/sesiones-component/sesiones-component';
import { RecomendacionesComponent } from './componente/recomendaciones-component/recomendaciones-component';
import { MiEvolucionComponent } from './componente/mi-evolucion-component/mi-evolucion-component';
import { NotificacionesEstudianteComponent } from './componente/notificaciones-component/notificaciones-component';
import { SuscripcionComponent } from './componente/suscripcion-component/suscripcion-component';
import { PagosComponent } from './componente/pagos-component/pagos-component';
import { ConfiguracionesComponent } from './componente/configuraciones-component/configuraciones-component';
import { PerfilPsicologoComponent } from './componente/perfil-psicologo-component/perfil-psicologo-component';
import { VistaEmocionalComponent } from './componente/vista-emocional-component/vista-emocional-component';
import { HistorialSesionesComponent } from './componente/historial-sesiones-component/historial-sesiones-component';
import { TendenciasEmocionalesComponent } from './componente/tendencias-emocionales-component/tendencias-emocionales-component';
import { RecomendacionesPsicologoComponent } from './componente/recomendaciones-psicologo-component/recomendaciones-psicologo-component';
import { BancoPreguntasComponent } from './componente/banco-preguntas-component/banco-preguntas-component';
import {
  NotificacionesPsicologoComponent
} from './componente/notificaciones-psicologo-component/notificaciones-psicologo-component';
import {Layout3} from './layout3/layout3';
import {AdminPerfilesComponent} from './componente/admin-perfiles/admin-perfiles';
import {AuthGuard} from './guard/auth-guard';
export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'registrar/estudiante', component: RegistrarEstudianteComponent },
  { path: 'registrar/psicologo', component: RegistrarPsicologoComponent },

  // Layout Estudiante
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ESTUDIANTE' },
    children: [
      { path: 'perfil', component: PerfilEstudianteComponent,canActivate: [AuthGuard]  },
      { path: 'test-emocional', component: TestEmocionalComponent },
      { path: 'estado-emocional', component: EstadoEmocionalComponent },
      { path: 'sesiones', component: SesionesComponent },
      { path: 'recomendaciones', component: RecomendacionesComponent },
      { path: 'mi-evolucion', component: MiEvolucionComponent },
      { path: 'notificaciones', component: NotificacionesEstudianteComponent },
      { path: 'suscripcion', component: SuscripcionComponent },
      { path: 'pagos', component: PagosComponent },
      { path: 'configuracion', component: ConfiguracionesComponent }
    ]
  },

  // Layout Psicólogo
  {
    path: '',
    component: Layout2,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_PSICOLOGO' },
    children: [
      { path: 'perfil-psicologo', component: PerfilPsicologoComponent,canActivate: [AuthGuard] },
      { path: 'vista-emocional', component: VistaEmocionalComponent },
      { path: 'historial-de-sesiones', component: HistorialSesionesComponent },
      { path: 'recomendaciones-psicologo', component: RecomendacionesPsicologoComponent },
      { path: 'banco-preguntas', component: BancoPreguntasComponent }, // standalone
      { path: 'tendencias-emocionales', component: TendenciasEmocionalesComponent },
      { path: 'notificaciones-psicologo', component: NotificacionesPsicologoComponent },
      { path: 'configuraciones-psicologo', component: ConfiguracionesComponent }
    ]
  },
  //layout para admin
  {
    path: '',
    component: Layout3,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
    children: [
      {path: 'admin-perfiles', component: AdminPerfilesComponent,canActivate: [AuthGuard] },

    ]
  },

  { path: '**', redirectTo: '' }
];
