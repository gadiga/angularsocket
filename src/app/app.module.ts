import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { DataListComponent } from './data-list/data-list.component';
import { SubListComponent } from './data-list/sub-list/sub-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DataListComponent,
    SubListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ WebsocketService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
