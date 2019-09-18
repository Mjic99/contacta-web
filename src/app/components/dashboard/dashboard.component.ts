import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  page : string

  constructor() { }

  ngOnInit() {
    this.page = 'inicio'
  }

  changePage(page: string) {
    this.page = page
  }

}
