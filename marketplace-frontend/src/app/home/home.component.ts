// Importiert die benötigten Angular-Module
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Enthält grundlegende Angular-Direktiven wie *ngIf, *ngFor
import { RouterModule } from '@angular/router'; // Ermöglicht Navigation innerhalb der Anwendung

// Deklariert die Metadaten für die Home-Komponente
@Component({
  selector: 'app-home', // Definiert den CSS-Selektor für die Komponente
  standalone: true, // Markiert diese Komponente als eigenständig, d.h. sie benötigt kein Angular-Modul (NgModule)
  imports: [CommonModule, RouterModule], // Importiert Angular-Direktiven und RouterModule für die Navigation
  templateUrl: './home.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  styleUrls: ['./home.component.less'], // Verweist auf die zugehörige Stylesheet-Datei
})

export class HomeComponent {
  // Methode zur Navigation zur Dashboard-Seite
  goToDashboard() {
    window.location.href = '/dashboard'; // Setzt die URL direkt und lädt die Seite neu
  }
}
