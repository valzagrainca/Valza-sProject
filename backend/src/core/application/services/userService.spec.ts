import { UserService } from './UserService';
import { IBaseRepository } from '../../../infrastructure/repositoryInterfaces/IBaseRepository';
import User from '../../domain/entities/users';

describe('UserService', () => {
  let mockRepository: jest.Mocked<IBaseRepository<User>>;
  let service: UserService;

  beforeEach(() => {
    mockRepository = {
      fetchAll: jest.fn(),
      findById: jest.fn(),
      updateById: jest.fn(),
      deleteById: jest.fn(),
      callFunction: jest.fn(),
      findByPhoneNumber:jest.fn(),
      callProcedure:jest.fn()
    } as jest.Mocked<IBaseRepository<User>>;

    service = new UserService(mockRepository);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const mockData = [{ id: 1, first_name: 'User1', last_name:'Test', number:'+38348525254',code:'123456', status:'HI',
      profile_picture:'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg' },
      { id: 2, first_name: 'User2', last_name:'Test', number:'+3835556954',code:'123456',  status:'HI',
      profile_picture:'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg' }];

      mockRepository.fetchAll.mockResolvedValue(mockData);

      const result = await service.getUsers('users');
      expect(result).toEqual(mockData);
      expect(mockRepository.fetchAll).toHaveBeenCalledTimes(1);
      expect(mockRepository.fetchAll).toHaveBeenCalledWith('users');
    });
  });
  describe('getUserById', () => {
    it('should return an user', async () => {
      const mockData = { id: 1, first_name: 'User1', last_name:'Test', number:'+38348525254',code:'123456', status:'HI',
      profile_picture:'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg' };

      mockRepository.findById.mockResolvedValue(mockData);

      const result = await service.getUserById(1,'users');
      expect(result).toEqual(mockData);
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockRepository.findById).toHaveBeenCalledWith(1,'users');
    });
  });
  describe('deleteUserById', () => {
    it('should return boolean value', async () => {
      mockRepository.deleteById.mockResolvedValue(true);

      const result = await service.deleteUserById(1,'users');
      expect(result).toEqual(true);
      expect(mockRepository.deleteById).toHaveBeenCalledTimes(1);
      expect(mockRepository.deleteById).toHaveBeenCalledWith(1,'users');
    });
  });
  describe('updateUser', () => {
    it('should return boolean value', async () => {
      mockRepository.updateById.mockResolvedValue(true);

      const result = await service.updateUser(1,'Test','Test','+345625262','123456','Hi','Some url','users');
      expect(result).toEqual(true);
      expect(mockRepository.updateById).toHaveBeenCalledTimes(1);
      expect(mockRepository.updateById).toHaveBeenCalledWith('users',{"first_name": "Test", "id": 1, "last_name": "Test", "number": "+345625262", "profile_picture": "Some url", "status": "Hi"},{"id":1});
    });
  });
});
