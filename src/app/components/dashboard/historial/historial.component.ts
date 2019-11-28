import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'dashboard-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  displayedColumns: string[] = ['FECHA', 'DESCRIPCION', 'COSTO', 'DIRECCION', 'ESTADO']
  services = []
  dataSource = new MatTableDataSource(this.services)

  @ViewChild(MatSort, {static: true}) sort: MatSort

  constructor( private adminService : AdminService) { }

  ngOnInit() {
    this.adminService.getServices().subscribe( services => {
      this.services = services
      this.dataSource = new MatTableDataSource(this.services)
      this.dataSource.sort = this.sort
    })
  }

}
