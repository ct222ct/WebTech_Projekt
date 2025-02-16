// Importiert die benötigten Angular-Module für HTTP-Anfragen und Services
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Deklariert den VehicleService als global verfügbaren Dienst
@Injectable({
  providedIn: 'root', // Der Service wird im Root-Modul (global) bereitgestellt
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/api/vehicles'; // Basis-URL für Fahrzeuge-Endpoints

  constructor(private http: HttpClient) {}

  /**
   * Holt alle verfügbaren Fahrzeuge
   * @returns Observable mit der Liste der Fahrzeuge
   */
  getVehicles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  /**
   * Fügt ein neues Fahrzeug hinzu
   * @param data - Die Fahrzeugdaten
   * @param token - Das JWT-Token des Benutzers für die Authentifizierung
   * @returns Observable mit der Server-Antwort
   */
  addVehicle(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(this.apiUrl, data, { headers });
  }

  /**
   * Aktualisiert die Daten eines vorhandenen Fahrzeugs
   * @param id - Die ID des Fahrzeugs
   * @param data - Die aktualisierten Fahrzeugdaten
   * @param token - Das JWT-Token des Benutzers für die Authentifizierung
   * @returns Observable mit der Server-Antwort
   */
  updateVehicle(id: number, data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers });
  }

  /**
   * Löscht ein Fahrzeug aus der Datenbank
   * @param id - Die ID des Fahrzeugs
   * @param token - Das JWT-Token des Benutzers für die Authentifizierung
   * @returns Observable mit der Server-Antwort
   */
  deleteVehicle(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  /**
   * Holt Fahrzeuge basierend auf einer bestimmten Kategorie
   * @param categoryID - Die ID der Kategorie
   * @returns Observable mit der Liste der Fahrzeuge in dieser Kategorie
   */
  getVehiclesByCategory(categoryID: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/category/${categoryID}`);
  }
}
