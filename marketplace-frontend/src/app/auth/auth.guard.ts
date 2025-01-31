import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Speichere die letzte Seite, außer wenn es die Registrierungsseite ist
    if (!state.url.includes('/register')) {
      localStorage.setItem('returnUrl', state.url);
    }

    this.router.navigate(['/login']);
    return false;
  }
}
