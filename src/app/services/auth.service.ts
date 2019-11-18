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
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
    if (!this.currentUser) {
      this.currentUser = {
        uid: null
      }
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
          sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser))
          resolve(userData)
        }, 
        err => reject(err))
    })
  }

  logoutUser() {
    return this.afAuth.auth.signOut()
  }

  isAuthenticated() {
    if (JSON.parse(sessionStorage.getItem('currentUser')) && JSON.parse(sessionStorage.getItem('currentUser')).uid) {
      return true
    } else {
      return false
    } 
  }
}
