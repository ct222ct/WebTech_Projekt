// Importiert die benötigten Angular-Module und Services
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Service für API-Kommunikation (Benutzerdaten)
import { NgIf } from '@angular/common'; // Ermöglicht bedingte Darstellung im Template (*ngIf)
import { FormsModule } from '@angular/forms'; // Ermöglicht Zwei-Wege-Datenbindung (ngModel)

// Deklariert die Metadaten für die Profil-Komponente
@Component({
  selector: 'app-profile', // Definiert den CSS-Selektor für die Komponente
  templateUrl: './profile.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  imports: [
    NgIf, // Ermöglicht die Nutzung von *ngIf in der HTML-Datei
    FormsModule // Ermöglicht Formulareingaben und Zwei-Wege-Datenbindung
  ],
  styleUrls: ['./profile.component.less'] // Verweist auf die zugehörige Stylesheet-Datei
})
export class ProfileComponent implements OnInit {
  // Objekt zur Speicherung der Benutzerdaten
  user = {
    name: '',
    email: '',
    street: '',
    city: '',
    postalCode: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage: string | null = null; // Speichert mögliche Fehlermeldungen für die UI
  isEditMode: boolean = false; // Steuert den Bearbeitungsmodus (true = Bearbeitung aktiv)

  // Konstruktor: Initialisiert den UserService für API-Aufrufe
  constructor(private userService: UserService) {}

  // Wird beim Initialisieren der Komponente aufgerufen
  ngOnInit(): void {
    this.loadUserData(); // Lädt die Benutzerdaten aus dem Backend
  }

  // Methode zum Laden der Benutzerdaten aus der API
  loadUserData(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user.name = data.name;
        this.user.email = data.email;
        this.user.street = data.street;
        this.user.city = data.city;
        this.user.postalCode = data.postalCode;
      },
      (error) => {
        console.error('Fehler beim Laden der Benutzerdaten:', error);
        this.errorMessage = 'Die Benutzerdaten konnten nicht geladen werden.';
      }
    );
  }

  // Methode zum Umschalten des Bearbeitungsmodus
  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode; // Umschalten des Bearbeitungsmodus
    if (!this.isEditMode) {
      // Falls der Bearbeitungsmodus deaktiviert wird, lade die Originaldaten erneut
      this.loadUserData();
    }
  }

  // Methode zum Speichern der Änderungen im Profil
  saveProfile(): void {
    // Prüft, ob die eingegebenen Passwörter übereinstimmen
    if (this.user.password && this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Die Passwörter stimmen nicht überein.';
      return;
    }

    // Erstellt ein Objekt mit den aktualisierten Daten
    const updatedData = {
      name: this.user.name,
      email: this.user.email,
      street: this.user.street,
      city: this.user.city,
      postalCode: this.user.postalCode,
      password: this.user.password ? this.user.password : undefined // Sendet nur das Passwort, wenn es geändert wurde
    };

    // Ruft die API auf, um die Benutzerdaten zu aktualisieren
    this.userService.updateUserData(updatedData).subscribe(
      () => {
        alert('Profil erfolgreich aktualisiert'); // Erfolgsbenachrichtigung
        this.errorMessage = null;
        this.isEditMode = false; // Bearbeitungsmodus deaktivieren
      },
      (error) => {
        console.error('Fehler beim Speichern der Benutzerdaten:', error);
        this.errorMessage = 'Das Profil konnte nicht aktualisiert werden.';
      }
    );
  }

  // Methode zum Löschen des Benutzerkontos
  deleteProfile(): void {
    // Sicherheitsabfrage, um versehentliches Löschen zu vermeiden
    if (confirm('Möchtest du dein Konto wirklich löschen? Dies kann nicht rückgängig gemacht werden.')) {
      this.userService.deleteUserAccount().subscribe(
        () => {
          alert('Dein Konto wurde erfolgreich gelöscht.');
          localStorage.removeItem('token'); // Entfernt das gespeicherte Token aus dem lokalen Speicher
          window.location.href = '/login'; // Weiterleitung zur Login-Seite
        },
        (error) => {
          console.error('Fehler beim Löschen des Kontos:', error);
          this.errorMessage = 'Das Konto konnte nicht gelöscht werden.';
        }
      );
    }
  }
}
