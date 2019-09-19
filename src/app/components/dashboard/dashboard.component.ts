import { Component, OnInit, Renderer2, ViewChildren, QueryList, HostListener, ViewChild } from '@angular/core';

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
    {name: 'Super descuentazo'},
    {name: 'Quincena especial'},
    {name: 'Fin de mes de locura'},
    {name: 'Descuento navideño'},
  ]

  constructor(private renderer: Renderer2) { }

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
