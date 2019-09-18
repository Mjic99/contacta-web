import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'jobs'];
  topTrabajadores = [
    {position: 1, name: 'Juan Perez', jobs: 20},
    {position: 2, name: 'Pepe Gonzales', jobs: 14},
    {position: 3, name: 'Nicolas Pitta', jobs: 11},
    {position: 4, name: 'Daniel Rodriguez', jobs: 10},
    {position: 5, name: 'Juan Torres', jobs: 5}
  ]

  constructor() { }

  ngOnInit() {
  }

}
