// Importiert die benötigten Angular-Module für HTTP-Anfragen und Services
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Deklariert den UserService als global verfügbaren Dienst
@Injectable({
  providedIn: 'root', // Der Service wird im Root-Modul (global) bereitgestellt
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Basis-URL für Benutzer-Endpoints

  constructor(private http: HttpClient) {}

  /**
   * Registriert einen neuen Benutzer
   * @param user - Objekt mit Benutzername, E-Mail und Passwort
   * @returns Observable mit der Server-Antwort
   */
  register(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  /**
   * Holt die Benutzerdaten für den eingeloggten Benutzer
   * @returns Observable mit den Benutzerdaten
   */
  getUserData(): Observable<any> {
    const token = localStorage.getItem('token'); // JWT-Token aus dem LocalStorage holen
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/me`, { headers });
  }

  /**
   * Aktualisiert die Benutzerdaten
   * @param updatedData - Objekt mit den neuen Benutzerdaten
   * @returns Observable mit der Server-Antwort
   */
  updateUserData(updatedData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put(`${this.apiUrl}/update`, updatedData, { headers });
  }

  /**
   * Löscht das Benutzerkonto
   * @returns Observable mit der Server-Antwort
   */
  deleteUserAccount(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete(`${this.apiUrl}/user`, { headers });
  }

  /**
   * Führt eine Benutzeranmeldung durch
   * @param email - E-Mail-Adresse des Benutzers
   * @param password - Passwort des Benutzers
   * @returns Observable mit dem JWT-Token
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  /**
   * Speichert das Token im LocalStorage
   * @param token - JWT-Token des Benutzers
   */
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Holt das gespeicherte JWT-Token
   * @returns Token oder null, falls kein Token vorhanden ist
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Überprüft, ob der Benutzer eingeloggt ist
   * @returns true, falls ein Token existiert, sonst false
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
