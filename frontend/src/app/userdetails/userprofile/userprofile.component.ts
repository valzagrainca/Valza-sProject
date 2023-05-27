import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FileMetaData } from 'src/app/core/models/file-meta-data';
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
  selectedFile=null;
  private loggedInUser=this.authService.getLoggedInUser();
  imgSrc='../assets/images/avatar.jpg';
  path:string='';

  constructor(private formBuilder: FormBuilder, private authService:AuthService, 
    private router:Router, private fireStorage: AngularFireStorage, private fileService:FileService,
    private fireBaseService:FireBaseService){}

  ngOnInit(): void {
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
      console.log(image_url,'t');
      const { username, firstname, lastname, email, phone, status } = this.profileForm.value;
      this.authService.updateProfile(username, firstname, lastname, email,image_url, phone, status).subscribe(
        (response) => {
          this.loggedInUser=this.authService.getLoggedInUser();
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
  
  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
    console.log(this.selectedFile);
  }
  async changeProfile(): Promise<string> {
    const currentFileUpload = new FileMetaData(this.selectedFile!);
    this.path = 'Uploads/' + currentFileUpload.file.name + `/${this.loggedInUser?.id}`;
  
    try {
      await this.fireBaseService.uploadImage(this.path, this.selectedFile!, currentFileUpload);
      console.log('1', currentFileUpload);
      return currentFileUpload.url;
    } catch (error) {
      console.log('Error occurred:', error);
      throw error; // Throw the error to be caught by the caller
    }
  }
  
}
