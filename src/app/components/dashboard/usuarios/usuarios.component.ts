import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'dashboard-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  userListType: string = "cliente"

  filterField: string
  filterValue : string

  userFields: string[] = ['email', 'type']

  /* users = [
    {email: 'jorge@gmail.com', type: 'Prestador', info: ['Baneado 2 veces']},
    {email: 'juan@gmail.com', type: 'Cliente', info: ['Baneado 2 veces']},
    {email: 'pepe@gmail.com', type: 'Prestador', info: ['Baneado 2 veces']},
    {email: 'juan@gmail.com', type: 'Prestador', info: ['Baneado 2 veces']},
    {email: 'jorge@gmail.com', type: 'Cliente', info: ['Baneado 2 veces']},
    {email: 'marcelo@hotmail.com', type: 'Cliente', info: ['Baneado 2 veces']},
    {email: 'juan@gmail.com', type: 'Prestador', info: ['Baneado 2 veces']},
  ] */
  users: any[]

  filteredUsers: Object[]

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.setUsersType()
  }

  filterList () {
    this.filteredUsers = this.users.filter( user => {
      return user[this.filterField].toLowerCase().includes(this.filterValue.toLowerCase())
    })
  }

  setUsersType() {
    let obs: Observable<any[]>
    if (this.userListType == "cliente") {
      obs = this.adminService.getClienteList()
    }
    else {
      obs = this.adminService.getTrabajadorList()
    }
    obs.subscribe(users => {
      this.users = users
      this.filteredUsers = users
    })
  }

}
