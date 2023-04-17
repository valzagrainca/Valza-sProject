import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit{
  profileForm!: FormGroup;
  message: string='';
  status!: boolean;
  private loggedInUser=this.authService.getLoggedInUser();

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router:Router){}

  ngOnInit(): void {
    this.setupForm();
  }

  private setupForm(): void {
    this.profileForm = this.formBuilder.group({
      username: [this.loggedInUser?.username, [Validators.required]],
      firstname: [this.loggedInUser?.first_name],
      lastname: [this.loggedInUser?.last_name],
      email: [this.loggedInUser?.email, [Validators.required]],
      profilepicture: [this.loggedInUser?.profile_picture, [Validators.required]],
      phone: [this.loggedInUser?.phone, [Validators.required]],
      status: [this.loggedInUser?.status]
    });
  }

  updateUserProfile(): void{
    if(this.profileForm.valid){
      debugger;
      const username = this.profileForm.get('username')?.value;
      const firstname = this.profileForm.get('firstname')?.value;
      const lastname = this.profileForm.get('lastname')?.value;
      const email = this.profileForm.get('email')?.value;
      const profile_picture = this.profileForm.get('profilepicture')?.value;
      const phone = this.profileForm.get('phone')?.value;
      const status = this.profileForm.get('status')?.value;
      this.authService.updateProfile(username,firstname,lastname,email,profile_picture,phone,status).subscribe(
        (response) => {
          if (response) {
            this.router.navigate(['chat/userchats']);
          }
        },
        error => {
          this.message = error.error.message;
          this.status = false;
        }
      );
    }
  }
}