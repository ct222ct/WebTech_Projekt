// Importiert die benötigten Angular-Module für HTTP-Anfragen, Routing, Websockets und Formulare
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForOf, NgIf } from '@angular/common';
import { Location } from '@angular/common';
import { io } from 'socket.io-client';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vehicle-details', // Definiert den CSS-Selektor für die Komponente
  templateUrl: './vehicle-details.component.html', // Verweist auf die HTML-Template-Datei der Komponente
  styleUrls: ['./vehicle-details.component.less'], // Verweist auf die zugehörige Stylesheet-Datei
  imports: [NgIf, NgForOf, FormsModule], // Importiert Formulare und Direktiven für die Template-Nutzung
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: any = {}; // Speichert die Fahrzeugdetails
  isLoading: boolean = true; // Steuert den Ladezustand
  images: string[] = []; // Speichert die Bilder des Fahrzeugs
  user: any = {}; // Speichert die Benutzerdaten

  chatId: string = ''; // ID des Chats
  messages: any[] = []; // Liste der Nachrichten
  newMessage: string = ''; // Neue Nachricht
  userId: any; // ID des aktuellen Benutzers
  socket: any; // Socket.io Verbindung
  chatVisible: boolean | undefined; // Steuert die Sichtbarkeit des Chats

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location,
    private authService: AuthService
  ) {}

  // Wird beim Initialisieren der Komponente aufgerufen
  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id'); // Fahrzeug-ID aus URL holen
    if (!vehicleId) {
      console.error('Fehler: Fahrzeug-ID ist null oder ungültig!');
      return;
    }
    this.loadVehicleDetails(vehicleId);
    this.loadVehicleImages(vehicleId);

    setTimeout(() => { // Wartezeit für sichergestellte Benutzerzuordnung
      if (this.vehicle.id) {
        this.loadUserData(vehicleId);
      }
    }, 1000);
  }

  /**
   * Lädt die Benutzerdaten aus dem AuthService
   */
  loadUserData(vehicleId: string): void {
    this.userId = this.authService.getUserId(); // Benutzer-ID aus dem AuthService holen
  }

  /**
   * Lädt die Fahrzeugdetails anhand der ID
   */
  loadVehicleDetails(vehicleId: string): void {
    this.http.get(`http://localhost:3000/api/vehicles/all-vehicle/${vehicleId}`).subscribe({
      next: (data) => {
        this.vehicle = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Fahrzeugdetails:', error);
        this.isLoading = false;
      },
    });
  }

  /**
   * Lädt alle Bilder des Fahrzeugs
   */
  loadVehicleImages(vehicleId: string): void {
    this.http.get<any[]>(`http://localhost:3000/api/vehicles/images/${vehicleId}`).subscribe({
      next: (images) => {
        if (images.length > 0) {
          this.images = images.map(img =>
            img.url.startsWith('/uploads/') ? `http://localhost:3000${img.url}` : img.url
          );
        }
      },
      error: (error) => {
        console.error('Fehler beim Laden der Fahrzeugbilder:', error);
      },
    });
  }

  /**
   * Startet einen Chat für das Fahrzeug
   */
  startChat(vehicleId: string): void {
    if (!this.userId) {
      console.error('Fehler: Kein Benutzer angemeldet! User-ID:', this.userId);
      return;
    }

    setTimeout(() => {
      this.loadVehicleDetails(vehicleId);
    }, 1000);

    if (!this.vehicle || !this.vehicle.userId) {
      console.error('Fehler: Fahrzeugdaten fehlen oder Verkäufer-ID nicht gesetzt! Fahrzeug:', this.vehicle);
      return;
    }

    const chatRequest = {
      buyerId: this.userId, // Käufer ist der aktuelle Benutzer
      sellerId: this.vehicle.userId, // Verkäufer ist der Besitzer des Fahrzeugs
      vehicleId: vehicleId
    };

    this.http.post('http://localhost:3000/api/chat/start', chatRequest).subscribe({
      next: (chat: any) => {
        if (!chat || !chat.id) {
          console.error('Fehler: Chat konnte nicht gestartet werden, keine ID erhalten.');
          return;
        }

        this.chatId = chat.id;
        this.socket = io('http://localhost:3000', {
          transports: ['websocket', 'polling'],
        });
        this.socket.emit('joinChat', this.chatId);

        this.loadMessages();

        this.socket.on('receiveMessage', (message: any) => {
          this.messages.push(message);
        });
      },
      error: (error) => {
        console.error('Fehler beim Starten des Chats:', error);
      }
    });
  }

  /**
   * Lädt die Nachrichten des aktuellen Chats
   */
  loadMessages(): void {
    this.http.get<any[]>(`http://localhost:3000/api/chat/messages/${this.chatId}`).subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Nachrichten:', error);
      }
    });
  }

  /**
   * Sendet eine Nachricht im aktuellen Chat
   */
  sendMessage(): void {
    this.startChat(this.vehicle.id);
    if (!this.newMessage.trim()) return;

    if (!this.chatId) {
      console.error('Fehler: Kein Chat gestartet!');
      return;
    }

    const messageData = {
      chatId: this.chatId,
      senderId: this.userId,
      text: this.newMessage.trim()
    };

    this.http.post('http://localhost:3000/api/chat/sendMessage', messageData).subscribe(() => {
      this.socket.emit('sendMessage', messageData);
      this.newMessage = '';
    }, error => {
      console.error('Fehler beim Senden der Nachricht:', error);
    });
  }

  /**
   * Schaltet die Chatbox an und aus
   */
  toggleChat(): void {
    this.chatVisible = !this.chatVisible;
  }

  /**
   * Kehrt zur vorherigen Seite zurück
   */
  goBack(): void {
    this.location.back();
  }
}
