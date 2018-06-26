import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat Service with WebSocket';
  serverConnected: boolean;
  dataList = [];

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.subscribeForMessages();
    this.chat.sendMsg('Hello world');
  }

  subscribeForMessages() {
    this.chat.messages.subscribe(msg=>{
      console.log('message from server....')
      this.dataList = this.dataList.concat(...msg.text);
    });
    this.serverConnected = this.chat.isConnected();
  }

  connectToServer() {
    this.chat.connectToServer();
    this.subscribeForMessages();
  }

  sendMessage() {
    this.chat.sendMsg('Hello world');
  }

  disconnectFromServer() {
    this.chat.disconnectFromServer();
    this.serverConnected = this.chat.isConnected();
    this.dataList = [];
  }
}
