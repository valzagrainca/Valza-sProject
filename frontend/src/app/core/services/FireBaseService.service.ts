import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn:'root'
})

export class FireBaseService{
    constructor(private firebaseAuth:AngularFireAuth){}
    async login(email: string,password: string){
        await this.firebaseAuth.signInWithEmailAndPassword(email,password);
    }
    async signup(email: string,password: string){
        await this.firebaseAuth.createUserWithEmailAndPassword(email,password);
    }
    logout(){
        this.firebaseAuth.signOut();
    }
}


