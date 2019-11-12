import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor (private db: AngularFirestore) { }

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

  getChats (id: string) : Observable<any> {
    return this.db.doc(`Admin_modelo/${id}`).valueChanges()
  }

}
