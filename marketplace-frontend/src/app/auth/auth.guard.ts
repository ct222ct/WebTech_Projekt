// Importiert notwendige Angular-Module und Services
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root', // Stellt sicher, dass dieser Guard in der gesamten Anwendung verfügbar ist
})
export class AuthGuard implements CanActivate {
  // Konstruktor für den AuthGuard mit Abhängigkeiten zum AuthService und Router
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Diese Methode entscheidet, ob eine Route betreten werden kann oder nicht.
   * @param route - Die Route, die aufgerufen wird.
   * @param state - Der Zustand der aktuellen Router-Navigation.
   * @returns `true`, wenn der Benutzer eingeloggt ist, sonst `false`.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Überprüft, ob der Benutzer eingeloggt ist
    if (this.authService.isLoggedIn()) {
      return true; // Zugriff erlaubt
    }

    // Falls nicht eingeloggt, zur Login-Seite umleiten
    this.router.navigate(['/login']);
    return false; // Zugriff verweigert
  }
}
