import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home">
      <header class="header">
        <h1>Willkommen bei Marketplace</h1>
        <p>Ihr Marktplatz für Produkte, Immobilien und Fahrzeuge</p>
      </header>

      <div class="search-bar">
        <input type="text" placeholder="Was suchen Sie?" class="search-input" />
        <button class="search-button">Suchen</button>
      </div>

      <div class="categories">
        <div class="category">
          <img src="/assets/icons/products.png" alt="Produkte" />
          <p>Produkte</p>
        </div>
        <div class="category">
          <img src="/assets/icons/real-estate.png" alt="Immobilien" />
          <p>Immobilien</p>
        </div>
        <div class="category">
          <img src="/assets/icons/cars.png" alt="Fahrzeuge" />
          <p>Fahrzeuge</p>
        </div>
      </div>

      <footer class="footer">
        <p>&copy; 2025 Marketplace. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  `,
  styles: [
    `
      .home {
        font-family: Arial, sans-serif;
        margin: 0 auto;
        max-width: 1200px;
        padding: 20px;
        text-align: center;
      }

      .header {
        margin-bottom: 30px;
      }

      .search-bar {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
      }

      .search-input {
        width: 60%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px 0 0 5px;
      }

      .search-button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
      }

      .search-button:hover {
        background-color: #0056b3;
      }

      .categories {
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
      }

      .category {
        text-align: center;
        padding: 10px;
      }

      .category img {
        width: 100px;
        height: 100px;
      }

      .category p {
        margin-top: 10px;
        font-weight: bold;
      }

      .footer {
        margin-top: 50px;
        font-size: 0.8em;
        color: #888;
      }
    `,
  ],
})
export class HomeComponent {}
