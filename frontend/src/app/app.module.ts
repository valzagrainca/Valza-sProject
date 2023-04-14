import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AlertComponent } from './shared/alert/alert.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ChatsComponent } from './chats/chats.component';
import { UserchatsComponent } from './chats/userchats/userchats.component';
import { MessagesComponent } from './chats/messages/messages.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { ChatsModule } from './chats/chats.module';

@NgModule({
  declarations: [
    AppComponent,
    UserprofileComponent,
    UserdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    ChatsModule
  ],
  providers:[
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
