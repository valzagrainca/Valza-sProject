import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileMetaData } from '../models/file-meta-data';
import { finalize } from 'rxjs';
import { FileService } from './file.service';

@Injectable({
    providedIn:'root'
})

export class FireBaseService{
    constructor(private firebaseAuth:AngularFireAuth,private fireStorage: AngularFireStorage, private fileService:FileService){}
    async login(email: string,password: string){
        await this.firebaseAuth.signInWithEmailAndPassword(email,password);
    }
    async signup(email: string,password: string){
        await this.firebaseAuth.createUserWithEmailAndPassword(email,password);
    }
    logout(){
        this.firebaseAuth.signOut();
    }
    async uploadImage(path: string, selectedFile: File, currentFileUpload: FileMetaData): Promise<void> {
        const storageRef = this.fireStorage.ref(path);
        const uploadTask = storageRef.put(selectedFile);
      
        await new Promise<void>((resolve, reject) => {
          uploadTask.snapshotChanges().pipe(
            finalize(() => {
              storageRef.getDownloadURL().subscribe(downloadLink => {
                currentFileUpload.url = downloadLink;
                currentFileUpload.size = currentFileUpload.file.size;
                currentFileUpload.name = currentFileUpload.file.name;
      
                this.fileService.saveMetaDataOfFile(currentFileUpload);
                resolve(); // Resolve the Promise when everything is done
              }, error => {
                reject(error); // Reject the Promise if an error occurs
              });
            })
          ).subscribe(
            (res: any) => {
              console.log(res);
            },
            err => {
              console.log('Error occurred:', err);
              reject(err); // Reject the Promise if an error occurs
            }
          );
        });
      }      
      
      
}


