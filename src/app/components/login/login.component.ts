import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email : string
  password : string

  constructor(private router: Router, private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onLogin () : void {
    this.authService.loginUser(this.email, this.password)
      .then( (res) => {
        this.router.navigate(['/dashboard'])
      }).catch( error => this.snackBar.open(error.message, 'Error', {duration:2000})
      )
  }

}
