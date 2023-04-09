import express from 'express';
import { IUserService } from '../core/application/serviceInterfaces/IUserService';
import { UserService } from '../core/application/services/UserService';
import User from '../core/domain/entities/users';
import { BaseRepository } from '../infrastructure/repositories/BaseRepository';
import { IBaseRepository } from '../infrastructure/repositoryInterfaces/IBaseRepository';
import { AuthController } from "../UI/controllers/AuthController";
import db from '../infrastructure/dbConnection/database';

const userRepository: IBaseRepository<User>=new BaseRepository<User>(db);
const userService:IUserService = new UserService(userRepository);
const authController=new AuthController(userService);
const router = express.Router();

router.get('/', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup',authController.getSignUp);

router.post('/signup',authController.postSignUp);

export default router;