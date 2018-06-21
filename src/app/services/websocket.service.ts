import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';

/*
  /src/polyfills.ts has been updated to take care of a bug with socket.io
  for globals.
*/

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket; //socket to connect to wsocket server

  constructor() { }

  connect(): Rx.Subject<MessageEvent>  {

    this.socket = io(environment.ws_url);

    let observable = new Observable(observer => {
      this.socket.on('message', data => {
        console.log('Message from server...' + data);
        observer.next(data);
      });

      let disconnect = () => this.socket.disconnect();

      return disconnect;
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    };

    console.log(Observable.constructor);

    return Rx.Subject.create(observer, observable);

  }
}
