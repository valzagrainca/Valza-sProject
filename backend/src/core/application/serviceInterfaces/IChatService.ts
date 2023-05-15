import Chat from '../../domain/entities/chats';
import User from '../../domain/entities/users';
import Message from '../../domain/entities/messages';

export interface IChatService {
  getChats(id: number, funcName: string): Promise<{ chats: Chat[] }>;
  getMessages(chat_id: number, funcName: string): Promise<Message[]>;
  sendMessage(user_id: number, text:string, chat_id:number, procedureName: string): Promise<boolean>;
  countNotSeenMessages(user_id: number, chat_id: number, funcName: string):Promise<number>;
  markAsSeen(user_id: number, chat_id: number,procedureName: string): Promise<boolean>;
}