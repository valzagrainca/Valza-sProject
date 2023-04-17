import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { LoginResponseModel } from 'src/app/auth/models/login-response.models';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { LoggedInUser } from '../models/user';

@Injectable({
    providedIn:'root'
})

export class AuthService{
    private loggedInUser: LoggedInUser|null=null;
    constructor(
        private http: HttpClient, private config:ConfigService, private router: Router
    ){}

    logIn(email: string, password: string): Observable<LoginResponseModel> {
        const body = { email, password };
        return this.http.post<LoginResponseModel>(this.config.apiUrl + 'login', body).pipe(
            tap(response => {
                localStorage.setItem('loggedInUser', JSON.stringify(response.user));
                })
          );
    }
    
    setSession(token: string) {
        const expiresAt = moment().add(1, 'hour').unix();
        localStorage.setItem('access_token', token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt));
        console.log(localStorage.getItem('access_token'),' ',localStorage.getItem('expires_at'));
    }

    getLoggedInUser(){
        const user = localStorage.getItem('loggedInUser');
        if(user){
            this.loggedInUser= JSON.parse(user);
            return this.loggedInUser;
        }
        return null;
    }

    setLoggedInUser(loggedInUser: LoggedInUser|null){
        this.loggedInUser=loggedInUser;
    }

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem('loggedInUser');
    }

    public isLoggedIn() {
        const expiration = this.getExpiration();
        if (expiration){
            return moment().isBefore(this.getExpiration());
        }
        return false;
    }

    private navigateToLogin() {
        this.router.navigate(['/login']); 
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403 || err.status === 400) {
          this.logout(); 
          this.navigateToLogin();
        }
        return throwError(err);
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        if (expiration) {
          const expiresAt = JSON.parse(expiration);
          return moment(expiresAt);
        }
        return null;
    }    
    
    getUsers(){
        return this.http.get<any>(this.config.apiUrl+'admin/users');
    }

    signup(username: string, password: string, email: string, phone: string): Observable<any>{
        const body = {
            username: username,
            password: password,
            email: email,
            phone: phone
        };
        return this.http.post<any>(this.config.apiUrl+'signup',body);
    }

    updateProfile(username: string, firstname: string, lastname: string, email: string, profilepicture: string, phone: string, status: string): Observable<any>{
        debugger;       
        const body={
            id: this.loggedInUser?.id,
            username: username,
            email: email,
            first_name: firstname,
            last_name: lastname,
            phone: phone,
            password: this.loggedInUser?.password,
            status: status,
            profile_picture: profilepicture
        }

        return this.http.post(this.config.apiUrl+'admin/edit-user',body);
    }
}


