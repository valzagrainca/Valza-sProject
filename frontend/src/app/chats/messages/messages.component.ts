import { AfterViewChecked, Component, ElementRef, EventEmitter, NgModule, OnInit, ViewChild } from '@angular/core';
import { Messages } from 'src/app/core/models/messages';
import { LoggedInUser } from 'src/app/core/models/loggedInUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatsService } from 'src/app/core/services/chats.service';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { Chat } from 'src/app/core/models/chat';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/core/services/config.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatWindow', { static: true }) chatWindow!: ElementRef;
  constructor(private chatService: ChatsService, private authService: AuthService,
              private router: Router, private fb: FormBuilder, private config: ConfigService){};
  replyForm!: FormGroup;
  messages: Messages[]=[];
  loggedInUser: LoggedInUser|null=null;
  selectedChatId:number|null=null;
  currentUser: User|null=null;
  
  ngOnInit(): void {
    this.setupForm();
    this.loggedInUser = this.authService.getLoggedInUser();
    this.chatService.selectedChat.subscribe(
      (res)=>{
        this.selectedChatId=res.chat_id;
        this.getChatMessages(this.selectedChatId);
        this.getCurrentUser(res.user_id);
      }
    )
    this.getNewMessage();
  }

  ngAfterViewChecked(): void {
    this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
  }

  private getChatMessages(chatid: number){
    this.chatService.getUserMessages(chatid).subscribe(
      (res)=>{
        this.messages=res.messages;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  private getNewMessage(): void{
    this.config.getMessage().subscribe((message:Messages)=> {
      this.messages.push(message);
    })
  }

  private getCurrentUser(user_id: number): void{
    this.authService.getUserDetails(user_id).subscribe(
      (res:User)=>{
        this.currentUser=res;
      }
    );
  }

  private setupForm(): void {
    this.replyForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  sendMessage(){
    const message = this.replyForm.get('message')?.value;
    if(message){
      if(this.loggedInUser?.id && this.selectedChatId){
        this.chatService.sendMessage(this.loggedInUser.id,message,this.selectedChatId);
      }
      this.replyForm.get('message')?.reset();
    }
    else{
      console.log('Can not send empty message');
    }
  }
}
