import Chat from "../../domain/entities/chats";
import { IBaseRepository } from "../../../infrastructure/repositoryInterfaces/IBaseRepository";
import User from "../../domain/entities/users";
import Message from "../../domain/entities/messages";
import { IChatService } from "../serviceInterfaces/IChatService";

export class ChatService implements IChatService{
    constructor(private userRepository:IBaseRepository<User>,private chatRepository:IBaseRepository<Chat>){}

    getChats=async(id: number, funcName: string): Promise<{ chats: Chat[] }>=>{
        const chats=await this.chatRepository.callFunction(funcName,id);
        return {chats};
    }

    getMessages=async(chat_id:number, funcName:string): Promise<Message[]>=>{
        const messages=await this.chatRepository.callFunction(funcName,chat_id);
        return messages;
    }
}