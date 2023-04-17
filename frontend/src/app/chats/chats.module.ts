import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatsComponent } from './chats.component';
import { MessagesComponent } from './messages/messages.component';
import { UserchatsComponent } from './userchats/userchats.component';
import { ChatsRoutingModule } from './chats-routing.models';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ChatsComponent,
    MessagesComponent,
    UserchatsComponent
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class ChatsModule { }
