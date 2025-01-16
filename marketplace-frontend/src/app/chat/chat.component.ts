import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less'],
})
export class ChatComponent implements OnInit {
  @Input() vehicleId!: number;
  @Input() userId!: number;
  @Input() receiverId!: number;

  messages: any[] = [];
  newMessage: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getMessages(this.vehicleId, this.userId).subscribe((messages: any) => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messageService
        .sendMessage(this.newMessage, this.userId, this.receiverId, this.vehicleId)
        .subscribe(() => {
          this.newMessage = '';
          this.loadMessages();
        });
    }
  }
}
