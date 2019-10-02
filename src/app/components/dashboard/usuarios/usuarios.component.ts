import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'dashboard-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

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
  users: Object[]

  filteredUsers: Object[]

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getUserList().subscribe(users => {
      this.users = users
      this.filteredUsers = users
    });
  }

  filterList () {
    this.filteredUsers = this.users.filter( user => {
      return user[this.filterField].toLowerCase().includes(this.filterValue.toLowerCase())
    })
  }

}
