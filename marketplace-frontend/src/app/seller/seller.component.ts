// Importiert die benötigten Angular-Module
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Für reaktive Formulare
import { HttpClient } from '@angular/common/http'; // Für HTTP-Anfragen an das Backend

// Deklariert die Metadaten für die Verkäufer-Komponente
@Component({
  selector: 'app-seller', // Definiert den CSS-Selektor für die Komponente
  templateUrl: './seller.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  styleUrls: ['./seller.component.less'], // Verweist auf die zugehörige Stylesheet-Datei
  imports: [
    ReactiveFormsModule // Ermöglicht die Nutzung von reaktiven Formularen im Template
  ]
})
export class SellerComponent {
  vehicleForm: FormGroup; // Reaktives Formular für Fahrzeugeingaben
  selectedFiles: File[] = []; // Speichert ausgewählte Bilder für den Upload

  // Konstruktor: Initialisiert FormBuilder und HttpClient für API-Anfragen
  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialisiert das Formular mit den Fahrzeugfeldern
    this.vehicleForm = this.fb.group({
      name: [''], // Fahrzeugname
      model: [''], // Modell
      type: [''], // Typ (z. B. SUV, Limousine)
      description: [''], // Beschreibung
      price: [''], // Preis
      dateOfFirstRegistration: [''], // Erstzulassung
      mileage: [''], // Kilometerstand
      fuelType: [''], // Kraftstoffart
      color: [''], // Farbe
      condition: ['new'], // Zustand (Standardwert: "new")
    });
  }

  // Methode zum Verarbeiten der Dateiauswahl
  onFileSelect(event: any): void {
    this.selectedFiles = Array.from(event.target.files); // Speichert die ausgewählten Dateien in das Array
  }

  // Methode zum Senden des Formulars
  onSubmit(): void {
    const formData = new FormData(); // Erstellt ein FormData-Objekt für den Upload
    Object.keys(this.vehicleForm.value).forEach((key) => {
      formData.append(key, this.vehicleForm.value[key]); // Fügt alle Formularwerte in formData hinzu
    });

    // Fügt die ausgewählten Bilder zur FormData hinzu
    this.selectedFiles.forEach((file) => {
      formData.append('pictures', file);
    });

    // Sendet die Formulardaten an das Backend (POST-Anfrage)
    this.http.post('http://localhost:3000/api/vehicles', formData).subscribe({
      next: (response) => {
        console.log('Fahrzeug hinzugefügt:', response);
      },
      error: (error) => {
        console.error('Fehler beim Hinzufügen des Fahrzeugs:', error);
      },
    });
  }
}
