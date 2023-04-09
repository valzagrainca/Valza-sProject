import { IUserService } from "../../core/application/serviceInterfaces/IUserService";
import { UserController } from "./UserController";
import { Request, Response, NextFunction } from 'express';

describe('UserController',()=>{
    let mockUserService: jest.Mocked<IUserService>;
    let userController: UserController;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        mockUserService = {
            getUsers: jest.fn(),
            getUserById: jest.fn(),
            deleteUserById: jest.fn(),
            updateUser: jest.fn()
        } as jest.Mocked<IUserService>;
        
        userController= new UserController(mockUserService);

        req = {};
        res = {render: jest.fn(), redirect: jest.fn()}; 
        next = jest.fn();     
    });
    describe('getUsers', ()=>{
        it('should render admin/users page with users data', async () =>{
            const mockUsers= [{ id: 1, first_name: 'User1', last_name:'Test', number:'+38348525254',code:'123456', status:'HI',
            profile_picture:'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg' },
            { id: 2, first_name: 'User2', last_name:'Test', number:'+3835556954',code:'123456',  status:'HI',
            profile_picture:'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg' }];
            
            mockUserService.getUsers.mockResolvedValue(mockUsers);

            await userController.getUsers(req as Request, res as Response, next);
            expect(mockUserService.getUsers).toHaveBeenCalledTimes(1);
            expect(mockUserService.getUsers).toHaveBeenCalledWith('Users');
            expect(res.render).toHaveBeenCalledTimes(1);
            expect(res.render).toHaveBeenCalledWith('admin/users', {
              users: mockUsers,
              pageTitle: 'Users',
            });
            expect(next).not.toHaveBeenCalled();      
        });
    });
    describe('getUserById', ()=>{
        it('should render admin/edit-user page with user data', async () =>{
            req = {params: {userId: '1'}};
            const mockUser= { id: 1, first_name: 'User1', last_name:'Test', number:'+38348525254',code:'123456', status:'HI',
            profile_picture:'https://cdn2.vectorstock.com/i/1000x1000/41/11/flat-business-woman-user-profile-avatar-icon-vector-4334111.jpg' };
            
            mockUserService.getUserById.mockResolvedValue(mockUser);

            await userController.getUserDetail(req as Request, res as Response, next);
            expect(mockUserService.getUserById).toHaveBeenCalledTimes(1);
            expect(mockUserService.getUserById).toHaveBeenCalledWith(1,'Users');
            expect(res.render).toHaveBeenCalledTimes(1);
            expect(res.render).toHaveBeenCalledWith('admin/edit-user', {
              pageTitle: 'Edit User',
              user: mockUser
            });
            expect(next).not.toHaveBeenCalled();      
        });
    });
    describe('deleteUserById', ()=>{
        it('should render admin/edit-user page with user data', async () =>{
            req = {body: {userId: 1}};
            const mock = true;
            
            mockUserService.deleteUserById.mockResolvedValue(mock);

            await userController.deleteUser(req as Request, res as Response, next);
            expect(mockUserService.deleteUserById).toHaveBeenCalledTimes(1);
            expect(mockUserService.deleteUserById).toHaveBeenCalledWith(1,'Users');
            expect(res.redirect).toHaveBeenCalledTimes(1);
            expect(res.redirect).toHaveBeenCalledWith('/admin/users');
            expect(next).not.toHaveBeenCalled();      
        });
    });
    describe('editUser', ()=>{
        it('should render admin/edit-user page with user data', async () =>{
            req = {body: {id: 1, first_name:'Test', last_name:'Test', number:'+38345512563', status:'Hi', profile_picture:'some url'}};
            const mock = true;
            
            mockUserService.updateUser.mockResolvedValue(mock);

            await userController.editUser(req as Request, res as Response, next);
            expect(mockUserService.updateUser).toHaveBeenCalledTimes(1);
            expect(res.redirect).toHaveBeenCalledTimes(1);
            expect(res.redirect).toHaveBeenCalledWith('/admin/users');
            expect(next).not.toHaveBeenCalled();      
        });
    });
});