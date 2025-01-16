import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="vehicles">
      <header class="header">
        <h1>Fahrzeuge</h1>
        <p>Hier können Sie Fahrzeuge durchsuchen und hinzufügen.</p>
      </header>

      <div class="vehicle-list">
        <div class="vehicle" *ngFor="let vehicle of vehicles">
          <img [src]="vehicle.image" [alt]="vehicle.name" />
          <h2>{{ vehicle.name }}</h2>
          <p><strong>Modell:</strong> {{ vehicle.model }}</p>
          <p><strong>Preis:</strong> {{ vehicle.price | currency:'EUR' }}</p>
        </div>
      </div>

      <button class="add-button" (click)="addVehicle()">Fahrzeug hinzufügen</button>

      <footer class="footer">
        <p>&copy; 2025 Marketplace. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  `,
  styles: [
    `
      .vehicles {
        font-family: Arial, sans-serif;
        margin: 0 auto;
        max-width: 1200px;
        padding: 20px;
        text-align: center;
      }

      .header {
        margin-bottom: 30px;
      }

      .vehicle-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 20px;
        margin: 20px 0;
      }

      .vehicle {
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 15px;
        text-align: center;
        width: 300px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

      .vehicle img {
        width: 100%;
        height: auto;
        border-radius: 5px;
      }

      .add-button {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      .add-button:hover {
        background-color: #0056b3;
      }

      .footer {
        margin-top: 50px;
        font-size: 0.8em;
        color: #888;
      }
    `,
  ],
})
export class VehiclesComponent {
  vehicles = [
    {
      name: 'Mercedes-Benz A-Class',
      model: '2020',
      price: 25000,
      image: '/assets/images/mercedes-a-class.jpg',
    },
    {
      name: 'BMW 3 Series',
      model: '2019',
      price: 23000,
      image: '/assets/images/bmw-3-series.jpg',
    },
    {
      name: 'Audi Q5',
      model: '2021',
      price: 40000,
      image: '/assets/images/audi-q5.jpg',
    },
  ];

  addVehicle() {
    alert('Fahrzeug hinzufügen Funktion kommt bald!');
    // Hier können Sie die Logik zum Hinzufügen eines Fahrzeugs implementieren.
  }
}
