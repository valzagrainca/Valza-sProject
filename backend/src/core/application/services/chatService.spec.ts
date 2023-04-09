import { UserService } from './UserService';
import { ChatService } from './ChatService';
import { IBaseRepository } from '../../../infrastructure/repositoryInterfaces/IBaseRepository';
import User from '../../domain/entities/users';
import Chat from '../../domain/entities/chats';

describe('ChatService', () => {
  let mockRepositoryforUser: jest.Mocked<IBaseRepository<User>>;
  let mockRepositoryforChat: jest.Mocked<IBaseRepository<Chat>>;
  let userService: UserService;
  let chatService: ChatService;

  beforeEach(() => {
    mockRepositoryforUser = {
      fetchAll: jest.fn(),
      findById: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
      callFunction: jest.fn(),
      findByPhoneNumber:jest.fn(),
      callProcedure:jest.fn()
    } as jest.Mocked<IBaseRepository<User>>;

    mockRepositoryforChat = {
        fetchAll: jest.fn(),
        findById: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn(),
        callFunction: jest.fn(),
        findByPhoneNumber:jest.fn(),
        callProcedure:jest.fn()
      } as jest.Mocked<IBaseRepository<Chat>>;

    chatService= new ChatService(mockRepositoryforUser,mockRepositoryforChat);
  });

  describe('getChats', () => {
    it('should return an array of users and array of chats', async () => {
      const mockUserData = { id: 1, first_name: 'User1', last_name:'Test', number:'+38348525254', code:'123456',status:'HI',
      profile_picture:'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg' };
      
      const mockChatData = [{chat_id: 2, chat_name: 'group 2', group_picture: 'https://cdn2.vectorstock.com/i/1000x1000/26/66/profile-icon-member-society-group-avatar-vector-18572666.jpg',
      is_group: true, user_id: null, first_name: null, last_name: null, profile_picture: null}];

      const mockData = {user: mockUserData,chats: mockChatData};

      mockRepositoryforUser.findById.mockResolvedValue(mockUserData);
      mockRepositoryforChat.callFunction.mockResolvedValue(mockChatData);

      const result = await chatService.getChats(1,'get_user_chats');
      expect(result).toEqual(mockData);
      expect(mockRepositoryforUser.findById).toHaveBeenCalledTimes(1);
      expect(mockRepositoryforChat.callFunction).toHaveBeenCalledTimes(1);
      expect(mockRepositoryforUser.findById).toHaveBeenCalledWith(1,'Users');
      expect(mockRepositoryforChat.callFunction).toHaveBeenCalledWith('get_user_chats',1);
    });
  });
  describe('getMessages', () => {
    it('should return an array of users and array of chats', async () => {
      const mockData = [{chat_id:1, text:'test', image_url:null,video_url:null, document_url:null, user_id:1, name:'test'}];
      
      mockRepositoryforChat.callFunction.mockResolvedValue(mockData);

      const result = await chatService.getMessages(1,'v_view_chat')
      expect(result).toEqual(mockData);
      expect(mockRepositoryforChat.callFunction).toHaveBeenCalledTimes(1);
      expect(mockRepositoryforChat.callFunction).toHaveBeenCalledWith('v_view_chat',1);
    });
  });
});
