import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat Service with WebSocket';

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.chat.messages.subscribe(msg=>console.log('message from server....'+ msg));
  }

  sendMessage() {
    this.chat.sendMsg('Hello world');
  }
}
