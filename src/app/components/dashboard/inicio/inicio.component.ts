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
          jobs: worker.SERVICIOSREALIZADOS ? worker.SERVICIOSREALIZADOS.length : 0
        }
      })
      .sort( (w1, w2) => w2.jobs - w1.jobs )
      .slice(0,5).map((worker, index) => {
        worker.position = index + 1
        return worker
      })
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