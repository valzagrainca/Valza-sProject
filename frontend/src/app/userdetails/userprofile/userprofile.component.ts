import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FileMetaData } from 'src/app/core/models/file-meta-data';
import { LoggedInUser } from 'src/app/core/models/loggedInUser';
import { FireBaseService } from 'src/app/core/services/FireBaseService.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit{
  profileForm!: FormGroup;
  message: string='';
  status!: boolean;
  selectedFile:any;
  loggedInUser:LoggedInUser|null=null;
  imgSrc:string='';
  path:string='';

  constructor(private formBuilder: FormBuilder, private authService:AuthService, 
    private router:Router, private fireStorage: AngularFireStorage, private fileService:FileService,
    private fireBaseService:FireBaseService){}

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe((user: LoggedInUser | null) => {
      this.loggedInUser = user;
    });
    this.imgSrc=this.loggedInUser? this.loggedInUser.profile_picture:'../assets/images/avatar.jpg';
    this.setupForm();
  }

  private setupForm(): void {
    this.profileForm = this.formBuilder.group({
      username: [this.loggedInUser?.username, [Validators.required]],
      firstname: [this.loggedInUser?.first_name],
      lastname: [this.loggedInUser?.last_name],
      email: [this.loggedInUser?.email, [Validators.required]],
      phone: [this.loggedInUser?.phone, [Validators.required]],
      status: [this.loggedInUser?.status]
    });
  }

  async updateUserProfile(): Promise<void> {
    if (this.profileForm.valid) {
      const image_url=await this.changeProfile();
      const { username, firstname, lastname, email, phone, status } = this.profileForm.value;
      this.authService.updateProfile(username, firstname, lastname, email,image_url, phone, status).subscribe(
        (response) => {
          this.router.navigate(['chat/userchats']);
        },
        (error) => {
          this.message = error.error.message;
          this.status = false;
        }
      );
    }
    else{
      console.log('error');
    }
  }

  navigatetoChats(): void{
    this.router.navigate(['chat/userchats']);
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Read the selected file and update the imgSrc
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
   
  async changeProfile(): Promise<string> {
    const currentFileUpload = new FileMetaData(this.selectedFile!);
    this.path = 'Uploads/' + currentFileUpload.file.name + `/${this.loggedInUser?.id}`;
  
    try {
      await this.fireBaseService.uploadImage(this.path, this.selectedFile!, currentFileUpload);
      return currentFileUpload.url;
    } catch (error) {
      console.log('Error occurred:', error);
      throw error;
    }
  }
  
}
