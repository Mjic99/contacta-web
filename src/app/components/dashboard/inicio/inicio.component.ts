import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import * as firebase from 'firebase'

@Component({
  selector: 'dashboard-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'jobs'];

  mapPoints: firebase.firestore.GeoPoint[] = [
    new firebase.firestore.GeoPoint(-12.0837267, -76.9773347),
    new firebase.firestore.GeoPoint(-12.0827267, -76.9673347)
  ]

  topTrabajadores = [
    {position: 1, name: 'Juan Perez', jobs: 20},
    {position: 2, name: 'Pepe Gonzales', jobs: 14},
    {position: 3, name: 'Nicolas Pitta', jobs: 11},
    {position: 4, name: 'Daniel Rodriguez', jobs: 10},
    {position: 5, name: 'Juan Torres', jobs: 5}
  ]

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.setMapPoints()
    console.log(this.mapPoints)
  }

  setMapPoints() {
    this.adminService.getTrabajadorList().subscribe(users => {
      this.mapPoints = users.filter((user) => {
        return user.UBICACION
      }).map((user) => {
        return user.UBICACION
      })
      console.log(this.mapPoints)
    })
  }

}
