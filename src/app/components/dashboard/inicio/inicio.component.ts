import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'dashboard-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  topTrabajadores = []
  displayedColumns: string[] = ['position', 'name', 'jobs']

  markers: marker[]

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.setMapPoints()
    this.setTrabajadores()
  }

  setTrabajadores() {
    this.adminService.getTrabajadorList().subscribe(workers => {
      this.topTrabajadores = workers.map( (worker, index) => {
        return {
          position: index + 1,
          name: worker.NOMBRE,
          jobs: worker.SERVICIOSREALIZADOS.length
        }
      })
      this.topTrabajadores.sort( (w1, w2) => w1.jobs - w2.jobs )
    })
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
    })
  }
}

interface marker {
	lat: number
	lng: number
	label?: string
}