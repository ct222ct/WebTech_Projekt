import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForOf, NgIf } from '@angular/common';
import { Location } from '@angular/common';
import { io } from 'socket.io-client';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';



@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  imports: [
    NgIf,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./vehicle-details.component.less']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: any = [];
  isLoading: boolean = true;
  images: string[] = []; // Speichert Bilder

  chatId: string = '';
  messages: any[] = [];
  newMessage: string = '';
  userId: any;
  userEmail: any;
  socket: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location, private authService: AuthService) {}

  ngOnInit(): void {

    const vehicleId = this.route.snapshot.paramMap.get('id'); // Fahrzeug-ID aus URL holen
    if (!vehicleId) {
      console.error('Fehler: Fahrzeug-ID ist null oder ungültig!');
      return;
    }
    this.loadVehicleDetails(vehicleId);
    this.loadVehicleImages(vehicleId);
    //this.startChat(vehicleId);
    //this.loadUserData(vehicleId);

    setTimeout(() => { // Warte kurz, damit userId sicher gesetzt ist
      this.loadUserData(vehicleId);
    }, 1000);

  }

  loadUserData(vehicleId: string): void {
    this.userId = this.authService.getUserId(); // Benutzer-ID aus dem AuthService holen
    this.userEmail = this.authService.getUserEmail(); // Benutzer-ID aus dem AuthService holen
      setTimeout(() => { // Warte kurz, damit userId sicher gesetzt ist
        console.log('🔍 Benutzer-ID aus AuthService:', this.userId);
        this.startChat(vehicleId);
      }, 500);
      //this.startChat(vehicleId);
  }

  loadVehicleDetails(vehicleId: string): void {
      console.log('Lade Fahrzeugdetails für ID:', vehicleId);

      this.http.get(`http://localhost:3000/api/vehicles/all-vehicle/${vehicleId}`).subscribe({
        next: (data) => {
          console.log('Fahrzeugdaten empfangen:', data);
          this.vehicle = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Fehler beim Laden der Fahrzeugdetails:', error);
          this.isLoading = false;
        },
      });
  }

  loadVehicleImages(vehicleId: string): void {
    console.log('Lade Bilder für Fahrzeug ID:', vehicleId);

    this.http.get<any[]>(`http://localhost:3000/api/vehicles/images/${vehicleId}`).subscribe({
      next: (images) => {
        console.log(`Empfangene Bilder für Fahrzeug ${vehicleId}:`, images);
        if (images.length > 0) {
          this.images = images.map(img => img.url.startsWith('/uploads/')
            ? `http://localhost:3000${img.url}`
            : img.url
          );
        }
      },
      error: (error) => {
        console.error('Fehler beim Laden der Fahrzeugbilder:', error);
      },
    });
  }

  startChat(vehicleId: string): void {
    /*
    if (!this.userId) {
      console.error('Fehler: Kein Benutzer angemeldet! User-ID:', this.userId);
      return;
    }
*/

    setTimeout(() => { // Warte kurz, damit userId sicher gesetzt ist
      this.loadVehicleDetails(vehicleId)
    },1000);
    //this.loadVehicleDetails(vehicleId)



    console.log('Starte Chat für Benutzer-ID:', this.userId);
    console.log('Starte Chat für Fahrzeug-ID:', vehicleId);
    console.log('Fahrzeugdaten:', this.vehicle);
    console.log('Verkäufer-ID:', this.vehicle.userId);

    if (!this.vehicle || !this.vehicle.userId) {
      console.error('Fehler: Fahrzeugdaten fehlen oder Verkäufer-ID nicht gesetzt! Fahrzeug:', this.vehicle);
      return;
    }

    const chatRequest = {
      buyerId: 5,
      sellerId: 4,
      vehicleId: vehicleId
    };

    console.log('Chat-Anfrage senden:', chatRequest);

    this.http.post('http://localhost:3000/api/chat/start', chatRequest).subscribe({
      next: (chat: any) => {
        if (!chat || !chat.id) {
          console.error('Fehler: Chat konnte nicht gestartet werden, keine ID erhalten.');
          return;
        }

        this.chatId = chat.id;
        console.log(`✅ Chat gestartet mit ID: ${this.chatId}`);

        // Socket.io Verbindung aufbauen
        this.socket = io('http://localhost:3000', {
          transports: ['websocket', 'polling'], // Versuche WebSocket zuerst
        });
        this.socket.emit('joinChat', this.chatId);

        this.loadMessages();

        this.socket.on('receiveMessage', (message: any) => {
          this.messages.push(message);
        });
      },
      error: (error) => {
        console.error('❌ Fehler beim Starten des Chats:', error);
      }
    });
  }

  loadMessages(): void {
    this.http.get<any[]>(`http://localhost:3000/api/chat/messages/${this.chatId}`).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    if (!this.chatId) {
      console.error('Fehler: Kein Chat gestartet!');
      return;
    }

    const messageData = {
      chatId: this.chatId,
      senderId: this.userId, // Stelle sicher, dass userId gesetzt ist!
      text: this.newMessage.trim()
    };

    console.log('Sende Nachricht:', messageData);

    this.http.post('http://localhost:3000/api/chat/sendMessage', messageData).subscribe(() => {
      this.socket.emit('sendMessage', messageData);
      this.newMessage = '';
    }, error => {
      console.error('Fehler beim Senden der Nachricht:', error);
    });
  }



  goBack(): void {
    this.location.back();
  }
}
