import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserDetailsRoutingModule } from './userdetails-routing';
import { UserdetailsComponent } from './userdetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserprofileComponent,
    UserdetailsComponent
  ],
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class UserDetailsModule { }
