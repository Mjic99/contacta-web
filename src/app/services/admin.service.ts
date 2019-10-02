import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url : string = 'https://us-central1-contacta-d4362.cloudfunctions.net/'

  constructor (private http:HttpClient) { }

  getUserList ():Observable<any[]> {
    return this.http.get<any[]>(`${this.url}getAllUsers`);
  }

}
