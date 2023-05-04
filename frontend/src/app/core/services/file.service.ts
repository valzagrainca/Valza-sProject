import { Injectable } from '@angular/core';
import { FileMetaData } from '../models/file-meta-data';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn:'root'
})

export class FileService{
    constructor(private fireStore:AngularFirestore, private fireStorage:AngularFireStorage){}

    saveMetaDataOfFile(fileObj: FileMetaData){
        const fileMeta={
            id:'',
            name:fileObj.name,
            size:fileObj.size,
            url:fileObj.url
        }

        fileMeta.id=this.fireStore.createId();

        this.fireStore.collection('/Uploads').add(fileMeta);
    }

    getAllFiles(){
        this.fireStore.collection('/Uploads').snapshotChanges();
    }

    deleteFile(fileMeta: FileMetaData){
        this.fireStore.collection('/Uploads').doc(fileMeta.id).delete();
        this.fireStorage.ref('/Uploads'+fileMeta.name).delete();
    }
}


