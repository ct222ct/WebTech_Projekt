import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller',
  standalone: true,
  template: `
    <h1>Fahrzeuge verwalten</h1>
    <button (click)="addVehicle()">Fahrzeug hinzufügen</button>
  `,
})
export class SellerComponent {
  constructor(private http: HttpClient) {}

  addVehicle() {
    const newVehicle = {
      name: 'BMW X5',
      modelId: 1,
      typeId: 2,
      price: 50000,
      description: 'Neuwertiges Fahrzeug',
    };
    this.http.post('http://localhost:3000/api/vehicles', newVehicle).subscribe(
      response => console.log('Fahrzeug hinzugefügt:', response),
      error => console.error('Fehler beim Hinzufügen', error)
    );
  }
}
