import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: Subject<any>;
  handler: any;
  serverConnected: boolean;

  constructor(private wsService: WebsocketService) {
    this.connectToServer();
   }

   connectToServer() {
    this.messages = <Subject<any>>this.wsService
    .connect()
    .pipe(map((response: any) => response));
    this.handler = this.messages.subscribe();
    this.serverConnected = true;
   }

   disconnectFromServer() {         
    this.handler.complete();
    this.serverConnected = false;
   }

   sendMsg(msg: any ): void {
     this.messages.next(msg);
   }

   isConnected() {
     return this.serverConnected;
   }
}
