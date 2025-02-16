// Importiert die benötigten Angular-Module und -Funktionen
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service'; // Importiert den MessageService für API-Aufrufe
import { FormsModule } from '@angular/forms'; // Importiert FormsModule für Zwei-Wege-Datenbindung (ngModel)
import { NgForOf } from '@angular/common'; // Importiert die Direktive *ngFor für Iterationen in Templates

// Deklariert die Metadaten für die Chat-Komponente
@Component({
  selector: 'app-chat', // Definiert den CSS-Selektor für die Komponente
  templateUrl: './chat.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  styleUrls: ['./chat.component.less'], // Verweist auf die zugehörige Stylesheet-Datei
  imports: [
    FormsModule, // Ermöglicht Formulareingaben und Zwei-Wege-Datenbindung
    NgForOf // Ermöglicht die Nutzung von *ngFor in der Template-Datei
  ]
})
export class ChatComponent implements OnInit { // Definiert die Chat-Komponente und implementiert OnInit
  // Eingabe-Variablen (Props) für die Komponente, die von einem Eltern-Element übergeben werden können
  @Input() vehicleId!: number; // ID des Fahrzeugs, für das gechattet wird
  @Input() userId!: number; // ID des aktuellen Benutzers
  @Input() receiverId!: number; // ID des Empfängers der Nachricht

  messages: any[] = []; // Array zum Speichern der Chat-Nachrichten
  newMessage: string = ''; // Variable für die neue Nachricht, die der Nutzer eingibt

  // Konstruktor: Initialisiert den MessageService für API-Kommunikation
  constructor(private messageService: MessageService) {}

  // Wird beim Initialisieren der Komponente aufgerufen
  ngOnInit(): void {
    this.loadMessages(); // Lädt die Nachrichten, sobald die Komponente gerendert wird
  }

  // Funktion zum Laden der Chat-Nachrichten aus dem Backend
  loadMessages(): void {
    this.messageService.getMessages(this.vehicleId, this.userId).subscribe((messages: any) => {
      this.messages = messages; // Speichert die empfangenen Nachrichten im messages-Array
    });
  }

  // Funktion zum Senden einer Nachricht
  sendMessage(): void {
    if (this.newMessage.trim()) { // Prüft, ob die Nachricht nicht leer ist
      this.messageService
        .sendMessage(this.newMessage, this.userId, this.receiverId, this.vehicleId)
        .subscribe(() => {
          this.newMessage = ''; // Löscht das Eingabefeld nach dem Senden
          this.loadMessages(); // Aktualisiert die Nachrichtenliste nach dem Senden
        });
    }
  }
}
