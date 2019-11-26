import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor (private db: AngularFirestore, private authService: AuthService) { }

  getTrabajadorList () : Observable<any[]> {
    return this.db.collection('Trabajador_modelo').valueChanges()
  }

  getClienteList () : Observable<any[]> {
    return this.db.collection('Cliente_modelo').valueChanges()
  }

  addDescuento (descuento: Object) : Promise<any> {
    return this.db.collection('Descuento_modelo').add(descuento)
  }

  getDescuentos () : Observable<any[]> {
    return this.db.collection('Descuento_modelo').valueChanges()
  }

  getUserInfo (id: string) : Observable<any> {
    return this.db.doc(`Admin_modelo/${id}`).valueChanges()
  }

  getChat (chatPath: string) : Observable<any> {
    return this.db.doc(chatPath).valueChanges()
  }

  getMessage (messagePath: string) : Observable<any> {
    return this.db.doc(messagePath).valueChanges()
  }

  sendMessage (chatPath: string, text: string) {
    this.db.collection('Mensaje_modelo').add({
      CHAT: chatPath,
      MENSAJE: text,
      USUARIO: `Admin_modelo/${this.authService.currentUser.uid}`
    }).then(messageRef => {
      this.db.doc(chatPath).update({
        MENSAJES: firebase.firestore.FieldValue.arrayUnion(messageRef.path)
      })
    })
  }

  getServices () : Observable<any> {
    return this.db.collection('Servicio_modelo').valueChanges()
  }

}
