import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../services/auth/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    CommonModule, RouterLinkActive],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {
  constructor(private router: Router, private authService: AuthService) {}

  irRegistrar() {
    this.router.navigate(['/auth'], { queryParams: { tab: 'registro' } });
  }

  logar() {
    this.router.navigate(['/login']);
  }

  acessarDashboard() {
    this.router.navigate(['/dashboard']); //precisa corrigir
  }

  detectarLogin() {
    return this.authService.isAuthenticated()
  }

  detectarLoginEPagina() {
    return this.authService.isAuthenticated() && this.router.url === '/'
  }

  logout() {
  localStorage.removeItem('token'); // remove token
}
}
