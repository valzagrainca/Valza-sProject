// import { IChatService } from "../../core/application/serviceInterfaces/IChatService";
// import {ChatController} from "./ChatController";
// import { Request, Response, NextFunction } from 'express';
// import User from "../../core/domain/entities/users";
// import Chat from "../../core/domain/entities/chats";

// describe('ChatController',()=>{
//     let mockChatService: jest.Mocked<IChatService>;
//     let chatController: ChatController;
//     let req: Partial<Request>;
//     let res: Partial<Response>;
//     let next: jest.Mock;

//     beforeEach(() => {
//         mockChatService = {
//             getChats: jest.fn(),
//             getMessages: jest.fn()
//         } as jest.Mocked<IChatService>;
        
//        chatController= new ChatController(mockChatService);

//         req = {};
//         res = {render: jest.fn(), redirect: jest.fn(), json: jest.fn()}; 
//         next = jest.fn();     
//     });
//     describe('getChats',()=>{
//         it('should render chats/userchats page with array of users and array of chats', async()=>{
//             req = {params: {userId: '1'}};
//             // const mockUserData:User = { id: 1, first_name: 'User1', last_name:'Test', number:'+38348525254',code:'123456', status:'HI',
//             profile_picture:'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg' };
            
//             const mockChatData:Chat[] = [{chat_id: 2, chat_name: 'group 2', group_picture: 'https://cdn2.vectorstock.com/i/1000x1000/26/66/profile-icon-member-society-group-avatar-vector-18572666.jpg',
//             is_group: true, user_id: 1, first_name: 'test', last_name: 'test'}];
      
//             const mockData = {user: 'test',chats: mockChatData};

//             mockChatService.getChats.mockResolvedValue(mockData);
            
//             await chatController.getUserChats(req as Request, res as Response, next);
//             expect(mockChatService.getChats).toHaveBeenCalledTimes(1);
//             expect(mockChatService.getChats).toHaveBeenCalledWith(1,'get_user_chats');
//             expect(res.render).toHaveBeenCalledTimes(1);
//             expect(res.render).toHaveBeenCalledWith('chats/userchats', {
//                 pageTitle: 'User Chat',
//                 user:mockData.user,
//                 chats:mockData.chats
//               });
//             expect(next).not.toHaveBeenCalled();      
//         });
//     });
//     describe('getMessagges',()=>{
//         it('should render chats/userchats page with array of users and array of chats', async()=>{
//             req = {params: {chatId: '1'}};
//             const mockData = [{chat_id:1, text:'test', image_url:'test',video_url:'test', document_url:'test', user_id:1, name:'test'}];

//             mockChatService.getMessages.mockResolvedValue(mockData);
            
//             await chatController.getMessages(req as Request, res as Response, next);
//             expect(mockChatService.getChats).toHaveBeenCalledTimes(1);
//             expect(mockChatService.getChats).toHaveBeenCalledWith(1,'v_view_chat');
//             expect(res.json).toHaveBeenCalledTimes(1);
//             expect(next).not.toHaveBeenCalled();      
//         });
//     });
// });