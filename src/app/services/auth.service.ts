import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

interface User {
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: User;

  constructor(public afAuth: AngularFireAuth) {
    this.currentUser = {
      uid: null
    }
  }

  registerUser() {}

  loginUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then( userData => {
          this.currentUser = {
            uid: userData.user.uid
          }
          resolve(userData)
        }, 
        err => reject(err))
    })
  }

  logoutUser() {
    return this.afAuth.auth.signOut()
  }

}
