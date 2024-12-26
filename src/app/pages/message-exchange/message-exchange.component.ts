import { Component, OnInit } from '@angular/core';
import {ChatWebsocketService} from "../../service/chat-websocket/chat-websocket.service";
import { catchError, map } from 'rxjs/operators';
import {of, concat, Subscription} from 'rxjs';
import {OrderService} from "../../service/order-service/order.service";



@Component({
  selector: 'app-message-exchange',
  templateUrl: './message-exchange.component.html',
  styleUrls: ['./message-exchange.component.css'],
})
export class MessageExchangeComponent implements OnInit {
  restaurants: { id: number; name: string }[] = [];
  selectedRestaurant: number | null = null;
  messages: { [restaurantId: number]: any[] } = {};
  newMessage: string = '';

  constructor(private chatService: ChatWebsocketService,
              private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  openNewChatDialog(): void {

  }
  fetchRestaurants(): void {
    this.orderService.getAllOrdersByUser().subscribe({
      next: (data: { [restaurantName: string]: number }) => {
        this.restaurants = Object.entries(data).map(([name, id]) => ({ id, name }));
      },
      error: (err) => {
        console.error('Error fetching restaurants:', err);
      }
    });
  }
  private activeSubscription?: Subscription;

  onRestaurantChange(): void {
    if (!this.selectedRestaurant) return;

    if (this.activeSubscription) {
      this.activeSubscription.unsubscribe();
    }

    const restaurantId = this.selectedRestaurant;

    // Pobierz historię czatu jako Observable
    const history$ = this.chatService.getChatHistory(restaurantId).pipe(
      map(history =>
        history.map(msg => ({
          content: msg.message,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp).toLocaleTimeString(),
          type: msg.sender === 'customer' ? 'customer' : 'restaurant'
        }))
      ),
      catchError(err => {
        console.warn('Error fetching chat history:', err);
        return of([]);
      })
    );
    // Subskrybuj nowe wiadomości z dynamicznego kanału
    const newMessages$ = this.chatService.subscribeToRestaurantChat(restaurantId).pipe(
      map(newMessages => {
        console.log('New messages received from backend:', newMessages); // Debug log
        return newMessages.map(msg => ({
          content: msg.message,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp).toLocaleTimeString(),
          type: msg.sender === 'customer' ? 'customer' : 'restaurant',
        }));
      })
    );


    this.activeSubscription = concat(history$, newMessages$).subscribe({
      next: messages => {
        this.messages[restaurantId] = [...(this.messages[restaurantId] || []), ...messages];
      },
      error: err => {
        console.error('Error handling messages:', err);
      },
    });
  }



  sendMessage(): void {
    if (!this.selectedRestaurant || !this.newMessage.trim()) return;

    const chatMessage = {
      message: this.newMessage,
      sender: 'customer',
      restaurantId: this.selectedRestaurant,
      restaurantName: this.getRestaurantName(this.selectedRestaurant)
    };

    this.chatService.sendMessage(`/chat.sendMessage`, chatMessage);
    const chatMessageDuplicate = {
      content: this.newMessage,
      sender: 'customer',
      restaurantId: this.selectedRestaurant,
      timestamp:new Date().toLocaleTimeString('en-US', { hour12: false }),
      type: chatMessage.sender,
    };
    this.messages[this.selectedRestaurant].push(chatMessageDuplicate);
    this.newMessage = '';
  }

  getRestaurantName(restaurantId: number): string {
    return this.restaurants.find((restaurant) => restaurant.id === restaurantId)?.name || 'Unknown';
  }
}
