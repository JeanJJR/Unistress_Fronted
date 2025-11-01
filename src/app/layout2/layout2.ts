import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-layout2',
  imports: [CommonModule, RouterModule],
  templateUrl: './layout2.html',
  styleUrl: './layout2.css',
})
export class Layout2 {
  constructor(private router: Router) {}

  cerrarSesion() {
    // Limpia auth, tokens, etc.
    this.router.navigate(['/']);
  }
}
