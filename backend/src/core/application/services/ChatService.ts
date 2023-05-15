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

    sendMessage=async(user_id: number, text:string, chat_id:number, procedureName: string): Promise<boolean>=>{
        const message=await this.chatRepository.callProcedure(procedureName,user_id,text,chat_id);
        return message;
    }

    countNotSeenMessages=async(user_id: number, chat_id: number, funcName: string): Promise<number>=>{
        const countMessages=await this.chatRepository.callFunction(funcName,user_id,chat_id);
        return countMessages[0];
    }

    markAsSeen=async(user_id: number, chat_id: number,procedureName: string): Promise<boolean>=>{
        return await this.chatRepository.callProcedure(procedureName,user_id,chat_id);
    }
}