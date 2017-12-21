import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgStyle } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { LoginUser } from '../../Entities/login-user';
import { RegisterUser } from '../../Entities/register-user';
import { error } from 'util';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;

  user: RegisterUser = new RegisterUser();

  
  constructor(private userService: UserService) {
    this.myForm = new FormGroup({
      "UserName": new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]),
      "Email": new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")]),
      "Password": new FormControl('', Validators.minLength(6)),
      "ConfirmPassword": new FormControl('', Validators.minLength(6)),
    }, this.PasswordMatchValidator);
  }

  ngOnInit() {
  }

  AddUser() {
    console.log(this.user);
  }

  PasswordMatchValidator(g: FormGroup) {
    return g.get('Password').value === g.get('ConfirmPassword').value
      ? null : { 'mismatch': true };
  }

  Submit() {
    var userName = this.myForm.controls.UserName.value;
    var userEmail = this.myForm.controls.Email.value;
    var password = this.myForm.controls.Password.value;
    var confirmPassword = this.myForm.controls.ConfirmPassword.value;
    console.log(this.myForm.controls);
    var newUser = new RegisterUser();
    newUser.UserName = userName;
    newUser.Email = userEmail;
    newUser.Password = password;
    newUser.ConfirmPassword = confirmPassword;

    this.userService.AddUser(newUser).subscribe(
      (data: RegisterUser) => { console.log(data) }, error => { console.log(error) });
  }

}