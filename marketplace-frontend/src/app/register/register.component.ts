// Importiert die benötigten Angular-Module und Services
import { Component } from '@angular/core';
import { UserService } from '../services/user.service'; // Service für Benutzerregistrierung
import { Router } from '@angular/router'; // Router für Navigation nach der Registrierung
import { FormsModule } from '@angular/forms'; // Ermöglicht Formulareingaben und Zwei-Wege-Datenbindung
import { NgIf } from '@angular/common'; // Ermöglicht Bedingte Darstellung in Templates (*ngIf)

// Deklariert die Metadaten für die Registrierungs-Komponente
@Component({
  selector: 'app-register', // Definiert den CSS-Selektor für die Komponente
  templateUrl: './register.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  styleUrls: ['./register.component.less'], // Verweist auf die zugehörige Stylesheet-Datei
  imports: [
    FormsModule, // Ermöglicht Nutzung von ngModel für Formulareingaben
    NgIf // Ermöglicht die Nutzung von *ngIf in der HTML-Datei
  ]
})
export class RegisterComponent {
  // Variablen zur Speicherung der Benutzereingaben
  name: string = '';
  email: string = '';
  password: string = '';
  street: string = '';
  city: string = '';
  postalCode: string = '';
  errorMessage: string = ''; // Speichert mögliche Fehlermeldungen für die UI

  // Konstruktor: Initialisiert UserService für API-Kommunikation und Router für Navigation
  constructor(private userService: UserService, private router: Router) {}

  // Methode zur Registrierung eines neuen Benutzers
  register(): void {
    // Überprüfung, ob alle Felder ausgefüllt sind
    if (!this.name || !this.email || !this.password || !this.street || !this.city || !this.postalCode) {
      this.errorMessage = 'Bitte füllen Sie alle Felder aus.';
      return;
    }

    // Erstellt ein Objekt mit den Benutzerdaten zur Registrierung
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      street: this.street,
      city: this.city,
      postalCode: this.postalCode
    };

    // Sendet die Registrierungsdaten an den UserService
    this.userService.register(newUser).subscribe(
      () => {
        alert('Registrierung erfolgreich!'); // Erfolgsnachricht
        this.router.navigate(['/login']); // Weiterleitung zur Login-Seite nach erfolgreicher Registrierung
      },
      (error) => {
        console.error('Fehler bei der Registrierung:', error);
        this.errorMessage = 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.';
      }
    );
  }
}
