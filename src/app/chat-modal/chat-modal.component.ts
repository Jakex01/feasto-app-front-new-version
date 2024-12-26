import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderResponse} from "../model/response/OrderResponse";
import {catchError, map} from "rxjs/operators";
import {concat, of, Subscription} from "rxjs";
import {ChatWebsocketService} from "../service/chat-websocket/chat-websocket.service";

@Component({
  selector: 'app-chat-modal',

  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ChatModalComponent>,
    private chatService: ChatWebsocketService,
    @Inject(MAT_DIALOG_DATA) public data: { order: OrderResponse}
  ) {}

  messages: { [restaurantId: number]: any[] } = {};
  private activeSubscription?: Subscription;
  newMessage = '';

  ngOnInit(): void {
    this.onOrderChange(this.data.order);
  }

  sendMessage(): void {
    if (!this.data.order.restaurantId || !this.newMessage.trim()) return;

    const chatMessage = {
      message: this.newMessage,
      sender: 'restaurant',
      restaurantId: this.data.order.restaurantId,
      restaurantName: this.data.order.restaurantName,
    };

    // Ensure the array exists for the restaurantId
    if (!this.messages[this.data.order.restaurantId]) {
      this.messages[this.data.order.restaurantId] = [];
    }

    this.chatService.sendMessage(`/chat.sendMessage`, chatMessage);

    const chatMessageDuplicate = {
      content: this.newMessage,
      sender: 'restaurant',
      restaurantId: this.data.order.restaurantId,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      type: chatMessage.sender,
    };

    console.log(chatMessageDuplicate);
    console.log(this.messages);
    this.messages[this.data.order.restaurantId].push(chatMessageDuplicate);
    this.newMessage = '';
  }

  close(): void {
    this.dialogRef.close();
  }

  onOrderChange(order: OrderResponse): void {
    if (!order.restaurantId) return;
    const history$ = this.chatService.getChatHistory(order.restaurantId).pipe(
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
    // console.log(this.);
    const newMessages$ = this.chatService.subscribeToRestaurantChat(order.restaurantId).pipe(
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
        this.messages[order.restaurantId] = [...(this.messages[order.restaurantId] || []), ...messages];
        console.log('Messages grouped by order IDs:', JSON.stringify(this.messages, null, 2)); // Pretty-printed JSON
      },
      error: err => {
        console.error('Error handling messages:', err);
      },
    });
  }

}
