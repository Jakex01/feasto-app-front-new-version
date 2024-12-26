import { Injectable } from '@angular/core';
import {Client, Message} from "@stomp/stompjs";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatWebsocketService {
  private client: Client;
  private messageSubjects: { [restaurantId: number]: BehaviorSubject<any[]> } = {};
  private apiBaseUrl = "http://localhost:8086/api/chat/static";
  private isConnected = false;

  constructor(private http: HttpClient) {

    const token = 'Bearer ' + localStorage.getItem('token') || '';
    this.client = new Client({
      webSocketFactory: () => new WebSocket(`ws://localhost:8086/ws?token=${encodeURIComponent(token)}`),
      reconnectDelay: 5000,
      debug: (str) => console.log('STOMP debug:', str),
    });

    this.client.onConnect = () => {
      console.log('Token sent in connectHeaders:', this.client.connectHeaders);
      console.log('Connected to WebSocket');
      this.isConnected = true;
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP error:', frame);
      this.isConnected = false;
    };

    this.client.onDisconnect = () => {
      console.log('Disconnected from WebSocket');
      this.isConnected = false;
    };
  }

  subscribeToRestaurantChat(restaurantId: number): Observable<any[]> {
    if (!this.messageSubjects[restaurantId]) {
      this.messageSubjects[restaurantId] = new BehaviorSubject<any[]>([]);

      // Ensure STOMP connection is active
      this.ensureConnected().then(() => {
        this.client.subscribe(`/topic/chat.${restaurantId}`, (message: Message) => {
          const newMessage = JSON.parse(message.body);
          this.messageSubjects[restaurantId].next([newMessage]);
        });
      }).catch((err) => {
        console.error('Failed to connect to WebSocket for subscription:', err);
      });
    }
    return this.messageSubjects[restaurantId].asObservable();
  }

  private ensureConnected(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve();
      } else {
        console.log('Activating WebSocket connection...');
        this.client.activate();

        // Listen for connection confirmation
        this.client.onConnect = () => {
          console.log('STOMP client connected');
          this.isConnected = true;
          resolve();
        };

        // Handle connection errors
        this.client.onStompError = (frame) => {
          console.error('STOMP connection error:', frame);
          this.isConnected = false;
          reject(frame);
        };

        this.client.onDisconnect = () => {
          console.log('Disconnected from WebSocket');
          this.isConnected = false;
          reject(new Error('WebSocket disconnected'));
        };
      }
    });
  }

  sendMessage(destination: string, chatMessage: any): void {
    if (!this.isConnected) {
      console.error('WebSocket connection is not established. Cannot send message.');
      return;
    }
    try {

      this.client.publish({
        destination: `/app${destination}`,
        body: JSON.stringify(chatMessage),
      });
    } catch (error) {
      console.error('Error while sending message:', error);
    }
  }
  getChatHistory(restaurantId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not available');
    }
    return this.http.get<any[]>(`${this.apiBaseUrl}/history`, {
      params: { restaurantId: restaurantId.toString() },
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getAllChats(): Observable<{ [restaurantName: string]: number }> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not available');
    }
    return this.http.get<{ [restaurantName: string]: number }>(`${this.apiBaseUrl}/all`, {
      headers: { Authorization: `Bearer ${token}` }, // Dodano "Bearer"
    });
  }


}
