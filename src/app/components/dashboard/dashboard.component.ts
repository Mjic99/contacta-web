import { Component, OnInit, Renderer2, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  page : string

  descuentos = [
    {name: 'Super descuentazo'},
    {name: 'Quincena especial'},
    {name: 'Fin de mes de locura'},
    {name: 'Descuento navideño'},
  ]

  @ViewChildren('option') optionsDivs: QueryList<any>

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.page = 'Inicio'
  }

  changePage(event) {
    this.page = event.target.innerHTML

    this.optionsDivs.forEach( (option) => {
      this.renderer.removeClass(option.nativeElement, 'selected')
    })

    if (event.target) this.renderer.addClass(event.target, 'selected')
  }

}
