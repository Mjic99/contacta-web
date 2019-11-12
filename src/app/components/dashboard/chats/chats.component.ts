import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'dashboard-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  chats

  constructor(private router: Router,
    private adminService: AdminService,
    private authService: AuthService) { }

  ngOnInit() {
    this.adminService.getUserInfo(this.authService.currentUser.uid).subscribe( user => {
      console.log(user)
    })
  }

}
