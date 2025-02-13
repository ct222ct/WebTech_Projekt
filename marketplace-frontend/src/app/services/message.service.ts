import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'http://localhost:3000/api/messages';

  constructor(private http: HttpClient) {}

  getMessages(vehicleId: number, userId: number) {
    return this.http.get(`${this.apiUrl}/${vehicleId}?userId=${userId}`);
  }

  sendMessage(content: string, senderId: number, receiverId: number, vehicleId: number) {
    return this.http.post(this.apiUrl, { content, senderId, receiverId, vehicleId });
  }
}
