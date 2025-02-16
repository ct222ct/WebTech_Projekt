// Importiert die benötigten Angular-Module für HTTP-Anfragen und Services
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Deklariert den MessageService als global verfügbaren Dienst
@Injectable({
  providedIn: 'root', // Der Service wird im Root-Modul (global) bereitgestellt
})
export class MessageService {
  private apiUrl = 'http://localhost:3000/api/messages'; // Basis-URL für Nachrichten-Endpunkte

  constructor(private http: HttpClient) {}

  /**
   * Holt die Nachrichten für ein bestimmtes Fahrzeug und Benutzer
   * @param vehicleId - Die ID des Fahrzeugs
   * @param userId - Die ID des aktuellen Benutzers
   * @returns Observable mit den Nachrichten für das Fahrzeug
   */
  getMessages(vehicleId: number, userId: number) {
    return this.http.get(`${this.apiUrl}/${vehicleId}?userId=${userId}`);
  }

  /**
   * Sendet eine Nachricht
   * @param content - Der Inhalt der Nachricht
   * @param senderId - ID des sendenden Benutzers
   * @param receiverId - ID des empfangenden Benutzers
   * @param vehicleId - ID des zugehörigen Fahrzeugs
   * @returns Observable mit der Server-Antwort
   */
  sendMessage(content: string, senderId: number, receiverId: number, vehicleId: number) {
    return this.http.post(this.apiUrl, { content, senderId, receiverId, vehicleId });
  }
}
