import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  error: Boolean;
  msg: string;

  constructor() { }

  ngOnInit() {
    console.log(this.registerForm);
  }

  onRegister() {

    const user = {
      name: this.registerForm.value.name,
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }

    console.log(user);
    

  }

}
