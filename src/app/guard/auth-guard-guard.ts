import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isAuthenticated();

  const token = authService.getToken();
  console.log('[DEBUG GUARD] Token:', token);
  console.log('[DEBUG GUARD] Token expirado?', authService.isTokenExpired(token));
  console.log('[DEBUG GUARD] Está logado?', authService.isAuthenticated());

  if (isLoggedIn) {
    console.log('[AuthGuard] token válido detectado');
    return true;
  }
    console.log('[AuthGuard] token invalido detectado');
    router.navigate(['/auth']);
    return false;

};
