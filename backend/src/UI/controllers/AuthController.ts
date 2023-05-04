import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../../core/application/serviceInterfaces/IUserService';
import {createToken, validateToken} from '../util/jwt';
import bcrypt from 'bcryptjs';
import { strict } from 'assert';

export class AuthController{
    constructor(
        private readonly userService: IUserService
    ){}
    
    getLogin=(req:Request, res:Response, next:NextFunction)=>{
        res.render('auth/login', {
            path: '/login',
            pageTitle: 'Login'
        });
    }
    postLogin=async (req:Request, res:Response, next:NextFunction)=>{
        const email=req.body.email;
        const password=req.body.password;
        const user=await this.userService.getUserByEmail(email,'users');
        if(user!=null){
            const passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );
            if(passwordIsValid){
                const accessToken= createToken(user);
                const expires=3600;
                res.cookie('access-token',accessToken, 
                {   maxAge: expires * 1000, 
                    httpOnly: true,
                    sameSite: 'strict' 
                });
            
                res.json({user:user,token:accessToken,expiresIn:expires});
            }
            else{
                res.status(500).json({message:"Error email or password "});
            }
        }
        else{
            res.status(500).json({message:"Error email or password "});
        }
        
    }

    getSignUp=(req:Request, res:Response, next:NextFunction)=>{
        res.render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup'
        });
    }

    postSignUp=async (req:Request, res:Response, next:NextFunction)=>{
        const username:string=req.body.username;
        const email:string = req.body.email
        const phone:string=req.body.phone;
        const password:string = bcrypt.hashSync(req.body.password, 8);
        const first_name:string=req.body.firstName;
        const last_name:string=req.body.lastName;

        if(await this.userService.getUserByEmail(email,'Users')!=null){
            res.status(500).json({ message: 'User with this email already exists '});
        }
        else{
            await this.userService.insertUser(username,email,phone,password,first_name,last_name,'insert_into_userstbl');
            res.status(200).json({ message: "User registered successfully " });
        }
    }
}