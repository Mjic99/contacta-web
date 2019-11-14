import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentReference } from '@angular/fire/firestore';

interface Chat {
  path: string,
  name: string
  messages : Object[]
}

@Component({
  selector: 'dashboard-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  users: object[] = []

  currentChat: Chat = null

  constructor(private router: Router,
    private adminService: AdminService,
    private authService: AuthService) { }

  ngOnInit() {
    /* this.adminService.getUserInfo(this.authService.currentUser.uid).subscribe( admin => {
      console.log(admin)
      admin.CHATS.forEach((chat: DocumentReference) => {
        this.adminService.getChatUser(chat.path).subscribe( users => {
          console.log(users)
          this.users.push(users[0])
          console.log(this.users)
        })
      });
    }) */
    this.adminService.getTrabajadorList().subscribe( trabajadores => {
      let users = trabajadores.filter(trabajador => trabajador.CHATADMIN && typeof trabajador.CHATADMIN == 'string')
      this.users = this.users.concat(users)
      console.log(this.users)
    })
  }

  setChat(user: any) {
    this.adminService.getChat(user.CHATADMIN).subscribe( chat => {
      this.currentChat = {
        path: user.CHATADMIN,
        name: null,
        messages: []
      }

      this.currentChat.name = user.NOMBRE

      chat.MENSAJES.forEach( (msgPath: string) => {
        this.adminService.getMessage(msgPath).subscribe( message => {
          this.currentChat.messages.push({
            text: message.MENSAJE,
            reply: message.USUARIO.split('/')[1]==this.authService.currentUser.uid
          })
        })
      })
    })
  }

  sendMessage(event: any) {
    this.adminService.sendMessage(this.currentChat.path, event.message)
  }

}
