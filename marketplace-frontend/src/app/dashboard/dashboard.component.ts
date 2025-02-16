// Importiert die benötigten Angular-Module und -Funktionen
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common'; // Importiert Angular-Direktiven

// Deklariert die Metadaten für die Dashboard-Komponente
@Component({
  selector: 'app-dashboard', // Definiert den CSS-Selektor für die Komponente
  templateUrl: './dashboard.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  styleUrls: ['./dashboard.component.less'], // Verweist auf die zugehörige Stylesheet-Datei
  imports: [
    NgForOf // Erlaubt die Nutzung der *ngFor-Direktive in der HTML-Datei
  ]
})
export class DashboardComponent implements OnInit { // Definiert die Dashboard-Komponente und implementiert OnInit
  // Definiert eine Liste von Kategorien mit Namen und Routen
  categories = [
    { name: 'Autos', route: 'cars' }, // Die Route für Autos (könnte auch ein Bild enthalten)
    { name: 'Motorräder', route: 'motorbikes' }, // Die Route für Motorräder (Bild kann später ergänzt werden)
  ];

  // Konstruktor: Initialisiert den Router für Navigation
  constructor(private router: Router) {}

  // Lifecycle Hook: Wird beim Initialisieren der Komponente ausgeführt
  ngOnInit(): void {}

  // Methode zur Navigation basierend auf der gewählten Kategorie
  viewVehicles(category: { route: string }): void {
    this.router.navigate([`/vehicles/${category.route}`]); // Navigiert zur jeweiligen Fahrzeugkategorie
  }
}
