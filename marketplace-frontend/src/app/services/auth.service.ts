// Importiert die benötigten Angular-Module und externe Abhängigkeiten
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Prüft, ob der Code im Browser läuft
import { BehaviorSubject } from 'rxjs'; // Ermöglicht eine reaktive Verwaltung des Login-Status
import { jwtDecode } from 'jwt-decode'; // Dekodiert JWT-Tokens

// Deklariert den AuthService als global verfügbaren Dienst
@Injectable({
  providedIn: 'root', // Der Service wird im Root-Modul (global) bereitgestellt
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false); // Reaktiver Status für Login-Zustand
  isLoggedIn$ = this.loggedInSubject.asObservable(); // Ermöglicht Komponenten, auf Login-Status zu reagieren

  // Konstruktor: Prüft beim Laden der Anwendung, ob ein Token existiert
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) { // Stellt sicher, dass der Code nur im Browser läuft
      const hasToken = !!localStorage.getItem('token'); // Prüft, ob ein Token vorhanden ist
      this.loggedInSubject.next(hasToken); // Aktualisiert den Login-Status
      this.autoLogoutOnTokenExpiration();
    }
  }

  // Gibt den aktuellen Login-Status zurück
  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  // Speichert das Token im LocalStorage und aktualisiert den Login-Status
  login(token: string): void {
    if (isPlatformBrowser(this.platformId)) { // Sicherstellen, dass es im Browser läuft
      localStorage.setItem('token', token);
      this.loggedInSubject.next(true); // Login-Status auf "eingeloggt" setzen
      this.autoLogoutOnTokenExpiration();
    }
  }

  // Entfernt das Token und setzt den Login-Status zurück
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.loggedInSubject.next(false); // Setzt den Status auf "nicht eingeloggt"
    }
  }

  // Gibt das gespeicherte Token zurück oder null, falls keines vorhanden ist
  getToken(): string | null {
    if (typeof window !== 'undefined') { // Sicherstellen, dass es im Browser läuft
      return localStorage.getItem('token');
    }
    return null;
  }

  // Dekodiert das Token und gibt die Benutzer-ID zurück
  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.id; // Erwartet, dass die Benutzer-ID als `id` im Token gespeichert ist
      } catch (error) {
        console.error('Fehler beim Dekodieren des Tokens:', error);
        return null;
      }
    }
    return null;
  }

  // Dekodiert das Token und gibt die Benutzer-E-Mail zurück
  getUserEmail(): string | null { // Korrigierte Rückgabewert von `number | null` zu `string | null`
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.email; // Erwartet, dass die E-Mail als `email` im Token gespeichert ist
      } catch (error) {
        console.error('Fehler beim Dekodieren des Tokens:', error);
        return null;
      }
    }
    return null;
  }
  //Überprüft, ob das Token abgelaufen ist
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }

  //Automatisches Logout, wenn das Token abgelaufen ist
  autoLogoutOnTokenExpiration(): void {
    if (this.isTokenExpired()) {
      this.logout();
    }
  }
}
