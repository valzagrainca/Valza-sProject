import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { ConfigService } from './config.service';
import { LoginResponseModel } from 'src/app/auth/models/login-response.models';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    constructor(
        private http: HttpClient, private config:ConfigService, private router: Router
    ){}

    logIn(email: string, password: string): Observable<LoginResponseModel> {
        const body = { email, password };
        return this.http.post<LoginResponseModel>(this.config.apiUrl + 'login', body);
    }
    
    setSession(token: string) {
        debugger;
        const expiresAt = moment().add(1, 'minute').unix();
        localStorage.setItem('access_token', token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt));
        console.log(localStorage.getItem('access_token'),' ',localStorage.getItem('expires_at'));
    }

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_at");
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
}


