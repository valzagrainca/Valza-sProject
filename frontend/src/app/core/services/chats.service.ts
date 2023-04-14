import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { ChatResponseModel } from 'src/app/chats/models/chat-response-model';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
    private chats:ChatResponseModel | undefined;
    constructor(private http: HttpClient, private config:ConfigService){}
    
    getUserChats():Observable<ChatResponseModel>{
        return this.http.get<ChatResponseModel>(this.config.apiUrl+'userchats/1')
    }
    
}