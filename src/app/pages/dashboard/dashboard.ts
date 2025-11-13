import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { Toolbar } from '../../shared/pages/toolbar/toolbar';
import { DashboardService } from '../../services/dashboard/dashboard-service';
import { DashboardResponse } from '../../models/dashboard-response';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { DispositivoDashboard } from '../../models/dispositivo-dashboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ MatToolbarModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatBadgeModule,
    Toolbar,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  dashboardData!: DashboardResponse;
  loading = true;

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        console.log(data)
        this.dashboardData = data;
        this.loading = false;
        console.log(this.dashboardData)
        this.cdr.markForCheck()
      },
      error: (err) => {
        console.error('Erro ao carregar dashboard:', err);
        this.loading = false;
      }
    });
  }

  editarDispositivo(dispositivo: DispositivoDashboard) {
    this.router.navigate(['/adicionarDispositivo'], { state: { dispositivo } });
  }

}
