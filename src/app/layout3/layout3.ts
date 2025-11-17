import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../services/iniciar-sesion';

@Component({
  selector: 'app-layout2',
  imports: [CommonModule, RouterModule],
  templateUrl: './layout3.html',
  styleUrl: './layout3.css',
})
export class Layout3 {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cerrarSesion(): void {
    this.authService.logout(); //
    this.router.navigate(['/']); //
  }
}


// Limpia auth, tokens, etc.
