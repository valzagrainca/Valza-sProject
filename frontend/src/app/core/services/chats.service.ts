import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, map, tap } from 'rxjs';
import { ChatResponseModel } from 'src/app/chats/models/chat-response-model';
import { AuthService } from './auth.service';
import { MessageResponseModel } from 'src/app/chats/models/message-response';
import { Chat } from '../models/chat';
import { Messages } from '../models/messages';

@Injectable({
  providedIn: 'root'
})

export class ChatsService {
  private chats:ChatResponseModel | undefined;
  constructor(private http: HttpClient, private config:ConfigService, private authService:AuthService){}

  private loggedInUser = this.authService.getLoggedInUser();
  selectedChat = new EventEmitter<Chat>();
  
  getUserChats():Observable<ChatResponseModel>{
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
    this.config.sendMessage(newMessage);
  }
}