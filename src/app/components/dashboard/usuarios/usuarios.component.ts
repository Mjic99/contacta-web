import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  filterField: string
  filterValue : string

  userFields: string[] = ['email', 'type']

  users = [
    {email: 'jorge@gmail.com', type: 'Prestador', info: ['Baneado 2 veces']},
    {email: 'juan@gmail.com', type: 'Cliente', info: ['Baneado 2 veces']},
    {email: 'pepe@gmail.com', type: 'Prestador', info: ['Baneado 2 veces']},
    {email: 'juan@gmail.com', type: 'Prestador', info: ['Baneado 2 veces']},
    {email: 'jorge@gmail.com', type: 'Cliente', info: ['Baneado 2 veces']},
    {email: 'marcelo@hotmail.com', type: 'Cliente', info: ['Baneado 2 veces']},
    {email: 'juan@gmail.com', type: 'Prestador', info: ['Baneado 2 veces']},
  ]

  filteredUsers: Object[]

  constructor() { }

  ngOnInit() {
    this.filteredUsers = this.users
  }

  filterList () {
    this.filteredUsers = this.users.filter( user => {
      return user[this.filterField].toLowerCase().includes(this.filterValue.toLowerCase())
    })
    console.log(this.filterField)
    console.log(this.filterValue)
  }

}
