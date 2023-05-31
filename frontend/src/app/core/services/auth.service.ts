import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { LoginResponseModel } from 'src/app/auth/models/login-response.models';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { LoggedInUser } from '../models/loggedInUser';
import { User } from '../models/user';
import { FireBaseService } from './FireBaseService.service';

@Injectable({
    providedIn:'root'
})

export class AuthService{
    private loggedInUser: LoggedInUser | null = null;
    private loggedInUserSubject: BehaviorSubject<LoggedInUser | null> = new BehaviorSubject<LoggedInUser | null>(null);
  
    constructor(
      private http: HttpClient,
      private config: ConfigService,
      private router: Router,
      private firebaseService: FireBaseService
    ) {}
  
    logIn(email: string, password: string): Observable<LoginResponseModel> {
      const body = { email, password };
      return this.http.post<LoginResponseModel>(this.config.apiUrl + 'login', body).pipe(
        tap(response => {
          localStorage.setItem('loggedInUser', JSON.stringify(response.user));
          this.loggedInUser = response.user;
          this.loggedInUserSubject.next(this.loggedInUser);
          this.firebaseService.login(email, password);
          this.config.setupSocketConnection();
        })
      );
    }
  
    setSession(token: string) {
      const expiresAt = moment().add(1, 'hour').unix();
      localStorage.setItem('access_token', token);
      localStorage.setItem('expires_at', JSON.stringify(expiresAt));
      console.log(localStorage.getItem('access_token'), ' ', localStorage.getItem('expires_at'));
    }
  
    getLoggedInUser(): Observable<LoggedInUser | null> {
      return this.loggedInUserSubject.asObservable();
    }
  
    setLoggedInUser(loggedInUser: LoggedInUser | null) {
      this.loggedInUser = loggedInUser;
      this.loggedInUserSubject.next(loggedInUser);
    }
  
    logout() {
      this.firebaseService.logout();
      this.config.disconnect();
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('loggedInUser');
      this.router.navigate(['login']);
      this.loggedInUser = null;
      this.loggedInUserSubject.next(null);
    }

    isLoggedIn() {
        const expiration = this.getExpiration();
        if (expiration) {
          const now = moment(); // current time as a Moment object
          return now.isBefore(expiration);
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
          const expiresAt = parseInt(JSON.parse(expiration));
          return moment.unix(expiresAt);
        }
        return null;
      }  
    
    getUsers(){
        return this.http.get<any>(this.config.apiUrl+'admin/users');
    }

    signup(username: string, firstName: string, lastName: string, password: string, email: string, phone: string): Observable<any>{
        const body = {
            username: username,
            password: password,
            email: email,
            phone: phone,
            firstName: firstName,
            lastName: lastName
        };
        return this.http.post<any>(this.config.apiUrl+'signup',body).pipe(
            tap(res=>{
                this.firebaseService.signup(email,password);
            })
        );
    }

    updateProfile(username: string, firstname: string, lastname: string, email: string, profilepicture: string, phone: string, status: string): Observable<LoggedInUser>{     
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

        return this.http.post<LoggedInUser>(this.config.apiUrl+'admin/edit-user',body).pipe(
            tap(response=> {
                localStorage.setItem('loggedInUser', JSON.stringify(response));
                this.setLoggedInUser(response);
            })
        );
    }

    getUserDetails(user_id: number){
        return this.http.get<User>(this.config.apiUrl+'admin/edit-user/'+user_id);
    }
}


