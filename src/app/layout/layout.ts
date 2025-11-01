import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class LayoutComponent {
  constructor(private router: Router) {}

  cerrarSesion() {
    // Limpia auth, tokens, etc.
    this.router.navigate(['/']);
  }
}
