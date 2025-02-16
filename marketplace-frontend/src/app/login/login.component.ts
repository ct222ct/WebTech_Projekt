// Importiert die benötigten Angular-Module und Services
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Ermöglicht Navigation und Abruf von Routenparametern
import { UserService } from '../services/user.service'; // Service für Benutzerverwaltung und Login
import { NgIf } from '@angular/common'; // Ermöglicht Bedingte Anweisungen in Templates
import { FormsModule } from '@angular/forms'; // Ermöglicht die Nutzung von Formularen
import { AuthService } from '../services/auth.service'; // Service für Authentifizierung

// Deklariert die Metadaten für die Login-Komponente
@Component({
  selector: 'app-login', // Definiert den CSS-Selektor für die Komponente
  standalone: true, // Standalone-Komponente (ab Angular 14, kein NgModule erforderlich)
  templateUrl: './login.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  styleUrls: ['./login.component.less'], // Verweist auf die zugehörige Stylesheet-Datei
  imports: [NgIf, FormsModule], // Importiert Angular-Direktiven für Bedingte Darstellung und Formulare
})
export class LoginComponent {
  email: string = ''; // Speichert die eingegebene E-Mail-Adresse
  password: string = ''; // Speichert das eingegebene Passwort
  errorMessage: string | null = null; // Speichert eine Fehlermeldung für die UI
  returnUrl: string = '/'; // Speichert die URL, zu der nach dem Login umgeleitet wird

  // Konstruktor: Injiziert die Services für Benutzerverwaltung, Authentifizierung und Routing
  constructor(
    private userService: UserService, // Service für API-Kommunikation (Login)
    private authService: AuthService, // Authentifizierungsservice (z.B. Speichern des Tokens)
    private router: Router, // Router für Navigation nach dem Login
    private route: ActivatedRoute // Aktivierte Route für Abruf von Query-Parametern
  ) {}

  // Lifecycle Hook: Wird ausgeführt, wenn die Komponente initialisiert wird
  ngOnInit(): void {
    // Lese den Parameter "returnUrl" aus der URL, falls der Benutzer weitergeleitet wurde
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Methode für die Login-Funktionalität
  login(): void {
    // Überprüfung, ob beide Felder ausgefüllt sind
    if (!this.email || !this.password) {
      this.errorMessage = 'Bitte geben Sie E-Mail und Passwort ein.';
      return;
    }

    // Aufruf des UserService zur Authentifizierung
    this.userService.login(this.email, this.password).subscribe(
      (response) => {
        // Speichert das Token und setzt den Login-Status
        this.authService.login(response.token);
        alert('Login erfolgreich!');

        // Prüft, ob eine returnUrl gespeichert wurde, um den Benutzer nach dem Login dorthin zurückzuleiten
        const returnUrl = localStorage.getItem('returnUrl');

        // Verhindert Weiterleitung auf die Registrierungsseite
        if (returnUrl && !returnUrl.includes('/register')) {
          this.router.navigate([returnUrl]); // Weiterleitung zur gespeicherten URL
        } else {
          this.router.navigate(['/']); // Standard-Weiterleitung zur Startseite
        }
        localStorage.removeItem('returnUrl'); // Löscht die gespeicherte returnUrl
      },
      (error) => {
        console.error('Fehler beim Login:', error);
        this.errorMessage = this.getErrorMessage(error.status); // Setzt eine benutzerfreundliche Fehlermeldung
      }
    );
  }

  // Methode zur Umwandlung von HTTP-Fehlermeldungen in benutzerfreundliche Nachrichten
  private getErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.';
      case 401:
        return 'Invalid email or password';
      case 500:
        return 'Internal server error occurred during login';
      default:
        return 'An unknown error occurred during login';
    }
  }
}
