import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule,
    MatIconModule,
    MatButtonModule, RouterLink],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {
  constructor(private router: Router) {}

  irRegistrar() {
    this.router.navigate(['/auth'], { queryParams: { tab: 'registro' } });
  }
}
