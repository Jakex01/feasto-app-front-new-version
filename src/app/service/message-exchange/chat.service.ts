import { Injectable } from '@angular/core';
import {Client} from "@stomp/stompjs";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private client: Client;
  private messagesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new WebSocket('http://localhost:8080/ws'),
      onConnect: () => {
        console.log('Connected to WebSocket');
        this.subscribeToMessages();
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
    });

    this.client.activate();
  }

  // Subskrybuj temat "/topic/public"
  private subscribeToMessages(): void {
    this.client.subscribe('/topic/public', (message) => {
      const receivedMessage = JSON.parse(message.body);
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, receivedMessage]);
    });
  }

  // Zwraca strumień wiadomości
  getMessages() {
    return this.messagesSubject.asObservable();
  }

  // Wyślij wiadomość
  sendMessage(chatMessage: any): void {
    if (this.client.connected) {
      this.client.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(chatMessage),
      });
    }
  }

  // Rozłącz się
  disconnect(): void {
    this.client.deactivate();
  }
}
