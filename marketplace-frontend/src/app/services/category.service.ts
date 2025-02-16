// Importiert die benötigten Angular-Module für Services und HTTP-Anfragen
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Ermöglicht HTTP-Anfragen
import { Observable } from 'rxjs'; // Stellt sicher, dass HTTP-Anfragen als Observable zurückgegeben werden

// Deklariert den CategoryService als global verfügbaren Dienst
@Injectable({
  providedIn: 'root', // Der Service wird im Root-Modul (global) bereitgestellt
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/categories'; // Basis-URL für Kategorien-Endpunkte

  constructor(private http: HttpClient) {}

  /**
   * Ruft die Liste aller Kategorien aus dem Backend ab
   * @returns Observable mit den Kategorien
   */
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);  // GET-Anfrage an `/api/categories`
  }

  /**
   * Ruft alle Marken (Marks) für eine bestimmte Kategorie ab
   * @param categoryId - Die ID der Kategorie
   * @returns Observable mit den Marken für die gegebene Kategorie
   */
  getMarksByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${categoryId}/marks`); // GET-Anfrage an `/api/categories/{categoryId}/marks`
  }

  /**
   * Ruft alle Fahrzeugtypen (Types) für eine bestimmte Kategorie ab
   * @param categoryId - Die ID der Kategorie
   * @returns Observable mit den Typen für die gegebene Kategorie
   */
  getTypesByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${categoryId}/types`); // GET-Anfrage an `/api/categories/{categoryId}/types`
  }
}
