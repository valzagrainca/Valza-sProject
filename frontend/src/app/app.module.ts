import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { UserprofileComponent } from './userdetails/userprofile/userprofile.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { ChatsModule } from './chats/chats.module';
import { UserDetailsModule } from './userdetails/userdetails.module';
import {AngularFireModule} from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { enviroment } from 'enviroments/enviroment';
import { RouterModule } from '@angular/router';
import { ConfigService } from './core/services/config.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    UserDetailsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    ChatsModule,
    AngularFireModule.initializeApp(enviroment.firebase),
    AngularFireStorageModule,
    RouterModule
  ],
  providers:[
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
