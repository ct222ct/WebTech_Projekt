// Importiert die benötigten Angular-Module für Authentifizierung, Routing und UI-Direktiven
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

// Deklariert die Haupt-App-Komponente
@Component({
  selector: 'app-root', // Definiert den CSS-Selektor für die Komponente
  templateUrl: './app.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  styleUrls: ['./app.component.less'], // Verweist auf die zugehörige Stylesheet-Datei
  imports: [
    RouterOutlet, // Ermöglicht das Einfügen von Routing-Komponenten
    RouterLink, // Erlaubt Navigation über Angular-Router
    NgIf, // Ermöglicht bedingte Anzeige von Elementen im Template
  ]
})
export class AppComponent {
  isLoggedIn: boolean = false; // Speichert den Login-Status des Benutzers
  username: string = 'Benutzer'; // Standardname für den Benutzer

  constructor(private authService: AuthService, private router: Router) {}

  // Wird beim Initialisieren der Komponente aufgerufen
  ngOnInit(): void {
    // Überwacht den Login-Status aus dem AuthService
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  /**
   * Loggt den Benutzer aus und leitet ihn zur Login-Seite weiter
   */
  logout(): void {
    this.authService.logout(); // Authentifizierungsstatus zurücksetzen
    this.router.navigate(['/login']); // Weiterleitung zur Login-Seite
  }
}
