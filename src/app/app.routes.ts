import { Routes } from '@angular/router';
import { authGuardGuard } from './guard/auth-guard-guard';

export const routes: Routes = [
  {
    path: '' , pathMatch: 'full',
    loadComponent: () => import('./pages/landing/landing').then(m => m.Landing)
  },
  {
    path: 'dashboard' ,
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuardGuard]
  },
  {
    path: 'auth' ,
    loadComponent: () => import('./pages/auth-component/auth-component').then(m => m.AuthComponent),
  },
  {
    path: 'adicionarDispositivo' ,
    loadComponent: () => import('./pages/device/add-device/add-device').then(m => m.AddDevice),
    //canActivate: [authGuardGuard] resolver - caso de f5 ele não detecta que esta logado
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
