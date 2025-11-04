import {ChangeDetectionStrategy, Component, NgModule} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'; // Para la tabla
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatepickerInput} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-sesiones-component',
  providers:[provideNativeDateAdapter()],
  imports: [MatCardModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatTableModule, MatIconModule, MatDatepickerModule, MatDatepickerInput],
  templateUrl: './sesiones-component.html',
  styleUrl: './sesiones-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SesionesComponent {

}

