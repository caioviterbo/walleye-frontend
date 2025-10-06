import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '' , pathMatch: 'full',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'dashboard' ,
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
];
