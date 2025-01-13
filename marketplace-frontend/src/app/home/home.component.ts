import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home">
      <h1>Willkommen bei Marketplace</h1>
      <p>Entdecken Sie Produkte, Immobilien und Fahrzeuge!</p>
    </div>
  `,
  styles: [
    `
      .home {
        text-align: center;
        margin-top: 50px;
      }
    `,
  ],
})
export class HomeComponent {}
