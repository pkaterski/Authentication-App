import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  showMsg: Boolean = false;
  msgClass: string = 'bg-warning';
  msg: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    
    // FUCK YOU
    setTimeout(() => {
      this.showMsg = true;
      this.msgClass = 'bg-danger';
      this.msg = 'FUCK YOU';
      setTimeout(() => this.showMsg = false, 1000)
    }, 3000);
  }

  onRegister() {
    // event.preventDefault();

    const user = {
      name: this.registerForm.value.name,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    console.log(user);
    this.authService.registerUser(user).subscribe((result: { success: boolean, msg: string }) => {
      if (result.success) {
        this.msg = 'Success';
        this.msgClass = 'bg-success';
        this.showMsg = true;
        setTimeout(() => this.router.navigate(['/login']), 1000);
      } else {
        this.msg = result.msg;
        this.msgClass = 'bg-danger';
        this.showMsg = true;
      }
    });
    

  }

}
