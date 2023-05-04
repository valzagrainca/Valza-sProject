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
  ngOnInit(): void {
    this.loggedInUser=this.authService.getLoggedInUser();
    this.chatService.getUserChats().subscribe(
      (result) => {
        this.chats = result.chats;
      },
      (error: any) => {
        console.error(error);
      }
  );}
  
  navigateToEditProfile():void{
    this.router.navigate(['/userdetail']);
  }

  selectedChat(chat: Chat){
    this.chatService.selectedChat.emit(chat);
  }

  logOut(){
    this.authService.logout();
  }
}

