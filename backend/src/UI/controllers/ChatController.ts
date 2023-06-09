import { Request, Response, NextFunction } from 'express';
import { IChatService } from '../../core/application/serviceInterfaces/IChatService';

export class ChatController{
    constructor(private chatService:IChatService){}

    getUserChats=async(req:Request, res:Response, next:NextFunction)=>{
        const userId: number=Number(req.params.userId);
        const result=await this.chatService.getChats(userId,'get_user_chats');
        res.json({
            chats:result.chats
        });
    }

    getMessages=async(req:Request, res:Response, next:NextFunction)=>{
        const chatId: number=Number(req.params.chatId);
        const messages=await this.chatService.getMessages(chatId,'v_view_chat');
        res.json({messages:messages});
    };

    sendMessage=async(req:Request, res:Response, next:NextFunction)=>{
        const user_id: number=req.body.user_id;
        const text: string=req.body.text;
        const chat_id: number=req.body.chat_id;
        console.log(user_id,' ',text,' ',chat_id);
        await this.chatService.sendMessage(user_id, text, chat_id,'send_chat');
        res.json({'message':'Message sent successfully'});
    };

    countNotSeenMessages=async(req:Request, res:Response, next:NextFunction)=>{
        const user_id: number=Number(req.params.user_id);
        const chat_id: number=Number(req.params.chat_id);
        const countmessages=await this.chatService.countNotSeenMessages(user_id,chat_id,'not_seen_messages');
        res.json(countmessages);
    };

    markAsSeen=async(req:Request, res:Response, next:NextFunction)=>{
        const user_id: number=req.body.user_id;
        const chat_id: number=req.body.chat_id;
        console.log(user_id,' ',chat_id);
        await this.chatService.markAsSeen(user_id,chat_id,'mark_as_seen');
        res.json({'message':'Updated successfully'});
    }
}
