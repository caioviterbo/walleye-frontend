import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isAuthenticated();

  if (isLoggedIn) {
    console.log('[AuthGuard] token válido detectado');
    return true;
  }
    console.log('[AuthGuard] token invalido detectado');
    router.navigate(['/auth']);
    return false;
};
