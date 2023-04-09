import Chat from '../../domain/entities/chats';
import User from '../../domain/entities/users';
import Message from '../../domain/entities/messages';

export interface IChatService {
  getChats(id: number, funcName: string): Promise<{ user: User | null, chats: Chat[] }>;
  getMessages(chat_id: number, funcName: string): Promise<Message[]>;
}