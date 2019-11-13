import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'dashboard-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  users: object[] = []

  currentChat: object = null

  constructor(private router: Router,
    private adminService: AdminService,
    private authService: AuthService) { }

  ngOnInit() {
    this.adminService.getUserInfo(this.authService.currentUser.uid).subscribe( admin => {
      console.log(admin)
      admin.CHATS.forEach((chat: DocumentReference) => {
        this.adminService.getChatUser(chat.path).subscribe( users => {
          console.log(users)
          this.users.push(users[0])
          console.log(this.users)
        })
      });
    })
  }

  setChat(chatRef: DocumentReference) {
    console.log(chatRef)
  }

}
