import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

@Component({
  selector: 'app-test-resultado-dialog',
  templateUrl: './TestResultadoDialog-component.html',
  styleUrls: ['./TestResultadoDialog-component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class TestResultadoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { mensaje: string }) {}
}
