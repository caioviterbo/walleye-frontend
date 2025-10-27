import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '' , pathMatch: 'full',
    loadComponent: () => import('./pages/landing/landing').then(m => m.Landing)
  },
  {
    path: 'dashboard' ,
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'auth' ,
    loadComponent: () => import('./pages/auth/auth').then(m => m.Auth)
  },
];
