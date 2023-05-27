import { Component, Injectable, OnInit } from '@angular/core';
import { LoggedInUser } from 'src/app/core/models/loggedInUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatsService } from 'src/app/core/services/chats.service';
import { ChatResponseModel } from '../models/chat-response-model';
import { Chat } from 'src/app/core/models/chat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userchats',
  templateUrl: './userchats.component.html',
  styleUrls: ['./userchats.component.css']
})
export class UserchatsComponent implements OnInit{
  loggedInUser: LoggedInUser|null=null;
  chats: Chat[]=[];
  constructor(private chatService: ChatsService,private authService:AuthService, private router:Router){}
  async ngOnInit(): Promise<void> {
    this.loggedInUser=this.authService.getLoggedInUser();
    const result = await this.chatService.getUserChats().toPromise();
    if(result){
      this.chats = result.chats;
      for(const chat of this.chats) {
        await this.notSeenChats(this.loggedInUser?.id, chat.chat_id);
      }
    }
    this.defaultChat();
  }
  
  navigateToEditProfile():void{
    this.router.navigate(['/userdetail']);
  }

  selectedChat(chat: Chat){
    this.chatService.selectedChat.emit(chat);
  }

  private defaultChat(): void{
    this.chatService.getDefaultChat().subscribe(
      (chat: Chat) => {
        this.selectedChat(chat);
      },
      (error) => {
        console.log(error);
      }
    );
  }  

  logOut(){
    this.authService.logout();
  }

  async notSeenChats(user_id:number|undefined, chat_id:number): Promise<void> {
    if(user_id){
      const res: { not_seen_messages: number }|undefined = await this.chatService.countNotSeenMessages(user_id,chat_id).toPromise();
      this.chats = this.chats.map(chat => {
        if (chat.chat_id === chat_id) {
          chat.unseen_count = Number(res?.not_seen_messages);
          return chat;
        } else {
          return chat;
        }
      });
    }
  }

  markAsSeen(user_id:number|undefined, chat_id:number){
    if(user_id){
      this.chatService.markMessageAsSeen(user_id,chat_id).subscribe(
        (res)=>{
          this.chats=this.chats.map(
            chat=>{
              if(chat.chat_id===chat_id){
                chat.unseen_count=0;
                return chat;
              }
              else
              {
                return chat;

              }
            }
          )
        }
      );
    }
  }
  
}
