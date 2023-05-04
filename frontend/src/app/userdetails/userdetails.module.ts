import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserDetailsRoutingModule } from './userdetails-routing';
import { UserdetailsComponent } from './userdetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { enviroment } from 'enviroments/enviroment';

@NgModule({
  declarations: [
    UserprofileComponent,
    UserdetailsComponent
  ],
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(enviroment.firebase),
    AngularFireStorageModule
  ],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class UserDetailsModule { }
