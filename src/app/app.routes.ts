import { Routes } from '@angular/router';
import {PerfilEstudianteComponent} from './componente/perfil-estudiante-component/perfil-estudiante-component';
import {TestEmocionalComponent} from './componente/test-emocional-component/test-emocional-component';
import {LayoutComponent} from './layout/layout';
import {IniciarSesionComponent} from './componente/iniciar-sesion-component/iniciar-sesion-component';
import {InicioComponent} from './componente/inicio-component/inicio-component';
import {RegistrarEstudianteComponent} from './componente/registrar-estudiante-component/registrar-estudiante-component';
import {RegistrarPsicologoComponent} from './componente/registrar-psicologo-component/registrar-psicologo-component';
import {EstadoEmocionalComponent} from './componente/estado-emocional-component/estado-emocional-component';
import {SesionesComponent} from './componente/sesiones-component/sesiones-component';
import {RecomendacionesComponent} from './componente/recomendaciones-component/recomendaciones-component';
import {MiEvolucionComponent} from './componente/mi-evolucion-component/mi-evolucion-component';
import {NotificacionesComponent} from './componente/notificaciones-component/notificaciones-component';
import {SuscripcionComponent} from './componente/suscripcion-component/suscripcion-component';
import {PagosComponent} from './componente/pagos-component/pagos-component';
import {ConfiguracionesComponent} from './componente/configuraciones-component/configuraciones-component';
import {Layout2} from './layout2/layout2';
import {PerfilPsicologoComponent} from './componente/perfil-psicologo-component/perfil-psicologo-component';
import {VistaEmocionalComponent} from './componente/vista-emocional-component/vista-emocional-component';
import {HistorialSesionesComponent} from './componente/historial-sesiones-component/historial-sesiones-component';
import {BancoPreguntasComponent} from './componente/banco-preguntas-component/banco-preguntas-component';
import {
  TendenciasEmocionalesComponent
} from './componente/tendencias-emocionales-component/tendencias-emocionales-component';
import {
  RecomendacionesPsicologoComponent
} from './componente/recomendaciones-psicologo-component/recomendaciones-psicologo-component';
import {
  NotificacionesPsicologoComponent
} from './componente/notificaciones-psicologo-component/notificaciones-psicologo-component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'registrar/estudiante', component: RegistrarEstudianteComponent },
  { path: 'registrar/psicologo', component: RegistrarPsicologoComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'perfil', component: PerfilEstudianteComponent  },
      { path: 'test-emocional', component: TestEmocionalComponent },
      { path: 'estado-emocional', component: EstadoEmocionalComponent },
      { path: 'sesiones', component: SesionesComponent },
      { path: 'recomendaciones', component: RecomendacionesComponent },
      { path: 'mi-evolucion', component: MiEvolucionComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: 'suscripcion', component: SuscripcionComponent },
      { path: 'pagos', component: PagosComponent },
      { path: 'configuracion', component: ConfiguracionesComponent },
    ]
  },
  {
    path: '',
    component: Layout2,
    children: [
      { path: 'perfil-psicologo', component: PerfilPsicologoComponent },
      { path: 'vista-emocional', component: VistaEmocionalComponent },
      { path: 'historial-de-sesiones', component: HistorialSesionesComponent },
      { path: 'recomendaciones-psicologo', component: RecomendacionesPsicologoComponent },
      { path: 'banco-preguntas', component: BancoPreguntasComponent },
      { path: 'tendencias-emocionales', component: TendenciasEmocionalesComponent },
      { path: 'notificaciones-psicologo', component: NotificacionesPsicologoComponent },
      { path: 'configuraciones-psicologo', component: ConfiguracionesComponent }
    ]
  }


];
