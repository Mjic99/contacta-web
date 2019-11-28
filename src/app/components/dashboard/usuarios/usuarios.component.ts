import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'dashboard-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  userListType: string = 'cliente'

  filterField: string
  filterValue : string

  userFields: string[] = ['email', 'type']

  users: any[]

  filteredUsers: Object[]

  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit() {
    this.setUsersType()
  }

  openDialog(user): void {
    this.dialog.open(UserDialog, {
      data: user
    })
  }

  filterList (): void {
    this.filteredUsers = this.users.filter( user => {
      if (user && user.NOMBRE){
        return user.NOMBRE.toLowerCase().includes(this.filterValue.toLowerCase())
      }
      else {
        return false
      }
    })
  }

  setUsersType() {
    let obs: Observable<any[]>
    if (this.userListType == 'cliente') {
      obs = this.adminService.getClienteList()
    }
    else {
      obs = this.adminService.getTrabajadorList()
    }
    obs.subscribe(users => {
      users.forEach(user => {
        if (user.TRABAJOSOFRECIDOS) {
          if (!(user.TRABAJOSOFRECIDOS instanceof Array)) {
            user.TRABAJOSOFRECIDOS = [user.TRABAJOSOFRECIDOS]
          }
        }
      });
      this.users = users
      this.filteredUsers = users
    })
  }

}

@Component({
  selector: 'user-dialog',
  template: `
  <h1 mat-dialog-title>{{user.NOMBRE}}</h1>
  <div mat-dialog-content>
    <p *ngIf="user.NUMERO"><strong>Número: </strong>{{user.NUMERO}}</p>
    <p *ngIf="user.CALIFICACION"><strong>Calificación: </strong>{{user.CALIFICACION}}</p>
    <p *ngIf="user.DIRECCION"><strong>Dirección: </strong>{{user.DIRECCION}}</p>
    <p *ngIf="user.DOCUMENTO"><strong>Nro. de documento: </strong>{{user.DOCUMENTO}}</p>
    <p *ngIf="user.TRABAJOSOFRECIDOS"><strong>Trabajos ofrecidos:</strong></p>
    <ul *ngIf="user.TRABAJOSOFRECIDOS">
      <li *ngFor="let trabajo of user.TRABAJOSOFRECIDOS">
        {{trabajo}}
      </li>
    </ul>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="close()">OK</button>
  </div>
  `
})
export class UserDialog {

  constructor( public dialogRef: MatDialogRef<UserDialog>, @Inject(MAT_DIALOG_DATA) public user ) {}

  close(): void {
    this.dialogRef.close();
  }

}