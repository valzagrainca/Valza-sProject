import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { FileMetaData } from 'src/app/core/models/file-meta-data';
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
  currentFileUpload!:FileMetaData;
  private loggedInUser=this.authService.getLoggedInUser();

  constructor(private formBuilder: FormBuilder, private authService:AuthService, 
    private router:Router, private fireStorage: AngularFireStorage, private fileService:FileService){}

  ngOnInit(): void {
    this.setupForm();
  }

  private setupForm(): void {
    this.profileForm = this.formBuilder.group({
      username: [this.loggedInUser?.username, [Validators.required]],
      firstname: [this.loggedInUser?.first_name],
      lastname: [this.loggedInUser?.last_name],
      email: [this.loggedInUser?.email, [Validators.required]],
      profile_picture: [this.loggedInUser?.profile_picture, [Validators.required]],
      phone: [this.loggedInUser?.phone, [Validators.required]],
      status: [this.loggedInUser?.status]
    });
  }

  updateUserProfile(): void {
    if (this.profileForm.valid) {
      debugger;
      const { username, firstname, lastname, email, profile_picture, phone, status } = this.profileForm.value;
      this.authService.updateProfile(username, firstname, lastname, email, profile_picture, phone, status).subscribe(
        (response) => {
          console.log(response);
          this.loggedInUser=this.authService.getLoggedInUser();
          this.router.navigate(['chat/userchats']);
        },
        (error) => {
          this.message = error.error.message;
          this.status = false;
        }
      );
    }
  }

  navigatetoChats(): void{
    this.router.navigate(['chat/userchats']);
  }
  
  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
    console.log(this.selectedFile);
  }
  onUpload(){
    console.log('here');
    this.currentFileUpload = new FileMetaData(this.selectedFile!);
    const path = 'Uploads/'+this.currentFileUpload.file.name;
    
    const storageRef= this.fireStorage.ref(path);
    const uploadTask= storageRef.put(this.selectedFile);

    uploadTask.snapshotChanges().pipe(finalize(()=>{
      storageRef.getDownloadURL().subscribe(downloadLink=>{
        this.currentFileUpload.url=downloadLink;
        this.currentFileUpload.size=this.currentFileUpload.file.size;
        this.currentFileUpload.name=this.currentFileUpload.file.name;
        
        this.fileService.saveMetaDataOfFile(this.currentFileUpload)
      })
    })
    ).subscribe((res:any)=>{
      console.log(res);
    },err=>{
      console.log('Error occured')
    })
  }
}
