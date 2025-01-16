import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importieren des CommonModule
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buyer',
  standalone: true,
  imports: [CommonModule], // Hinzufügen zu den Imports
  template: `
    <h1>Verfügbare Fahrzeuge</h1>
    <ul>
      <li *ngFor="let vehicle of vehicles">
        {{ vehicle.name }} - {{ vehicle.price }} €
      </li>
    </ul>
  `,
})
export class BuyerComponent {
  vehicles: any[] = []; // Typ ändern zu `any[]`

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/vehicles').subscribe(
      (data) => (this.vehicles = data),
      (error) => console.error('Fehler beim Abrufen der Fahrzeuge', error)
    );
  }
}
