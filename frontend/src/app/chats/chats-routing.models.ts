import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { UserchatsComponent } from './userchats/userchats.component';
import { ChatsComponent } from './chats.component';

const routes: Routes = [
  {
    path: 'chat',component: ChatsComponent,
    children: [
      { path: 'messages', component: MessagesComponent, data: { title: 'messages' }},
      { path: 'userchats', component: UserchatsComponent, data: { title: 'userchats' }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ChatsRoutingModule {
}
