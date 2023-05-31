import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, map, tap } from 'rxjs';
import { ChatResponseModel } from 'src/app/chats/models/chat-response-model';
import { AuthService } from './auth.service';
import { MessageResponseModel } from 'src/app/chats/models/message-response';
import { Chat } from '../models/chat';
import { Messages } from '../models/messages';
import { LoggedInUser } from '../models/loggedInUser';

@Injectable({
  providedIn: 'root'
})

export class ChatsService {
  loggedInUser: LoggedInUser | null=null;
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private authService: AuthService
  ) {
    this.authService.getLoggedInUser().subscribe((user: LoggedInUser | null) => {
      this.loggedInUser = user;
    });
  }
  selectedChat = new EventEmitter<Chat>();
  newMessage = new EventEmitter<Messages>();

  
  getUserChats():Observable<ChatResponseModel>{
    console.log('ser',this.loggedInUser?.id);
      return this.http.get<ChatResponseModel>(this.config.apiUrl+'userchats/'+this.loggedInUser?.id);
  }

  getUserMessages(chat_id:number):Observable<MessageResponseModel>{
    return this.http.get<MessageResponseModel>(this.config.apiUrl+'messages/'+chat_id);
  }
  
  getDefaultChat(): Observable<Chat> {
    return this.getUserChats().pipe(
      map((res: ChatResponseModel) => {
        return res.chats[0];
      })
    );
  }

  async sendMessage(user_id: number, text: string, chat_id: number){
    const body={
      user_id: user_id,
      text: text,
      chat_id: chat_id
    };
    const newMessage: Messages= {
      user_id: user_id,
      chat_id:chat_id,
      text: text,
      sent_at: new Date(),
      seen_at: false,
      delivered_at: false,
      document_url: '',
      video_url: '',
      image_url: '',
      name:'',
      is_group:false
    };
    await this.http.post(this.config.apiUrl+'sendmessage',body).toPromise();
    this.newMessage.emit(newMessage);
    this.config.sendMessage(newMessage);
  }

  countNotSeenMessages(user_id:number, chat_id:number):Observable<{ not_seen_messages: number }>{
    return this.http.get<{ not_seen_messages: number }>(this.config.apiUrl+`countmessages/${user_id}/${chat_id}`);
  }

  markMessageAsSeen(user_id:number, chat_id:number){
    const body={
      user_id: user_id,
      chat_id: chat_id
    };
    console.log(body);
    return this.http.post(this.config.apiUrl+'markseen',body);
  }
}