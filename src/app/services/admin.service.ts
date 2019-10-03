import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor (private db: AngularFirestore) { }

  getUserList () : Observable<any[]> {
    return this.db.collection('Trabajador_modelo').valueChanges();
  }

  addDescuento (descuento: Object) : Promise<any> {
    return this.db.collection('Descuento_modelo').add(descuento)
  }

}
