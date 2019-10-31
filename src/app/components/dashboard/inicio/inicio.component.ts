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

  topTrabajadores = [
    {position: 1, name: 'Juan Perez', jobs: 20},
    {position: 2, name: 'Pepe Gonzales', jobs: 14},
    {position: 3, name: 'Nicolas Pitta', jobs: 11},
    {position: 4, name: 'Daniel Rodriguez', jobs: 10},
    {position: 5, name: 'Juan Torres', jobs: 5}
  ]

  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A'
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B'
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C'
	  }
  ]

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.setMapPoints()
  }

  setMapPoints() {
    this.adminService.getTrabajadorList().subscribe(users => {
      this.markers = users.filter( user => user.UBICACION ).map( user => {
        return {
          lat: user.UBICACION.latitude,
          lng: user.UBICACION.longitude,
          label: user.NOMBRE
        }
      })
      console.log(this.markers)
    })
  }
}

interface marker {
	lat: number
	lng: number
	label?: string
}