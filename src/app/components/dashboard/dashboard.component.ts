import { Component, OnInit, Renderer2, ViewChildren, QueryList, HostListener, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  page : string
  @ViewChildren('option') optionsDivs: QueryList<any>
  @ViewChild('sidenav', {static: true}) sidenav

  descuentosTipos = [
    {name: 'PORCENTAJE'},
    {name: 'SOLES'}
  ]
  descuentos: Object[]
  descuentosHeader: string[]

  dctoTipo: string
  dctoDesde: Date
  dctoHasta: Date
  dctoMonto: number
  dctoClave: string

  constructor(private renderer: Renderer2,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.page = 'Inicio'
    this.onResize()
    this.getDescuentos()
  }

  changePage(event) {
    this.page = event.target.innerHTML
    this.optionsDivs.forEach( (option) => {
      this.renderer.removeClass(option.nativeElement, 'selected')
    })
    if (event.target) this.renderer.addClass(event.target, 'selected')
  }

  crearDescuento() {
    if (this.dctoDesde && this.dctoHasta && this.dctoMonto && this.dctoTipo && this.dctoClave) {
      this.adminService.addDescuento({
        DESDE: this.dctoDesde,
        HASTA: this.dctoHasta,
        MONTO: this.dctoMonto,
        TIPO: this.dctoTipo,
        CLAVE: this.dctoClave
      }).then((res) => {
        this.dctoDesde = null
        this.dctoHasta = null
        this.dctoMonto = null
        this.dctoTipo = null
        this.dctoClave = null
        this.snackBar.open('Descuento creado satisfactoriamente', 'OK', {duration:2000})
      })
    } else {
      this.snackBar.open('Debes llenar todos los campos', 'ERROR', {duration:2000})
    }
  }

  getDescuentos() {
    this.adminService.getDescuentos().subscribe(descuentos => {
      this.descuentos = descuentos
    })
    
    this.descuentosHeader = ['clave', 'tipo', 'monto', 'fin']
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.innerWidth < 500) {
      this.sidenav.close()
    }
    else {
      this.sidenav.open()
    }
  }

}
