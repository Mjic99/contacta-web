import { Component, OnInit, Renderer2, ViewChildren, QueryList, HostListener, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
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

  descuentos = [
    {name: 'Porcentaje'}
  ]
  dctoTipo: string
  dctoDesde: Date
  dctoHasta: Date
  dctoMonto: number

  constructor(private renderer: Renderer2,
    private adminService: AdminService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.page = 'Inicio'
    this.onResize()
  }

  changePage(event) {
    this.page = event.target.innerHTML
    this.optionsDivs.forEach( (option) => {
      this.renderer.removeClass(option.nativeElement, 'selected')
    })
    if (event.target) this.renderer.addClass(event.target, 'selected')
  }

  crearDescuento() {
    this.adminService.addDescuento({
      DESDE: this.dctoDesde,
      HASTA: this.dctoHasta,
      MONTO: this.dctoMonto,
      TIPO: this.dctoTipo
    }).then((res) => {
      this.dctoDesde = null
      this.dctoHasta = null
      this.dctoMonto = null
      this.dctoTipo = null
      this.snackBar.open('Descuento creado satisfactoriamente', 'OK', {duration:2000})
    })
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
