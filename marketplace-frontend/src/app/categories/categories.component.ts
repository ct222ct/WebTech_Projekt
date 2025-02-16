// Importiert die benötigten Module und Komponenten aus Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { NgForOf } from '@angular/common';

// Definiert die Metadaten der Komponente
@Component({
  selector: 'app-categories', // Definiert den CSS-Selektor für die Komponente
  templateUrl: './categories.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  styleUrls: ['./categories.component.less'], // Verweist auf die zugehörige Stylesheet-Datei
  imports: [
    NgForOf // Importiert die Direktive NgForOf für die Nutzung in der HTML-Datei (z.B. für *ngFor)
  ]
})
export class CategoriesComponent implements OnInit { // Erstellt eine Angular-Komponente und implementiert OnInit
  categories: any[] = []; // Definiert ein Array zur Speicherung der Kategorien

  // Der Konstruktor injiziert den CategoryService und den Router in die Komponente
  constructor(private categoryService: CategoryService, private router: Router) {}

  // Die ngOnInit-Methode wird automatisch beim Initialisieren der Komponente ausgeführt
  ngOnInit(): void {
    this.loadCategories(); // Lädt die Kategorien, sobald die Komponente initialisiert wird
  }

  // Methode zum Laden der Kategorien
  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => { // Ruft den Service auf und abonniert die Antwort
      this.categories = data; // Weist die empfangenen Daten dem categories-Array zu
    });
  }

  // Methode zur Navigation basierend auf der gewählten Kategorie
  viewVehicles(category: any): void {
    if (category.name === 'Cars') { // Wenn die Kategorie "Cars" ist
      this.router.navigate(['/vehicles/cars']); // Navigiere zur Route für Autos
    } else if (category.name === 'Motorbikes') { // Wenn die Kategorie "Motorbikes" ist
      this.router.navigate(['/vehicles/motorbikes']); // Navigiere zur Route für Motorräder
    }
  }
}
