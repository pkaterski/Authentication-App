import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  showMsg: Boolean = false;
  msgClass: string = 'bg-warning';
  msg: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    const user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    
    this.authService.authenticateUser(user).subscribe((data: any) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.msg = 'Success';
        this.msgClass = 'bg-success';
        this.showMsg = true;
        setTimeout(() => this.router.navigate(['/']), 200);
      } else {
        this.msg = data.msg;
        this.msgClass = 'bg-danger';
        this.showMsg = true;
      }
    })
    
  }

}
