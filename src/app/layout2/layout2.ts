import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../services/iniciar-sesion';

@Component({
  selector: 'app-layout2',
  imports: [CommonModule, RouterModule],
  templateUrl: './layout2.html',
  styleUrl: './layout2.css',
})
export class Layout2 {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cerrarSesion(): void {
    this.authService.logout(); //
    this.router.navigate(['/']); //
  }
}
