import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { NgStyle } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { LoginUser } from '../../Entities/login-user';
import { AuthenticationService } from '../../Services/authentication.service';
import {Router} from '@angular/router';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent {
    myForm: FormGroup;
  

    constructor(private userService: UserService, private authenticationService: AuthenticationService, 
                    private router: Router) {
        this.myForm = new FormGroup({
            "UserName": new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]),
            "Password": new FormControl('', Validators.minLength(6)),
            "ConfirmPassword": new FormControl('', Validators.minLength(6)),
        }, this.PasswordMatchValidator);
    }

    PasswordMatchValidator(control: FormGroup) {
        return control.get('Password').value === control.get('ConfirmPassword').value
            ? null : { 'mismatch': true };
    }

    Submit() {
        var userName = this.myForm.controls.UserName.value;
        var password = this.myForm.controls.Password.value;
        var confirmPassword = this.myForm.controls.ConfirmPassword.value;
        //console.log(this.myForm.controls);
        var newUser = new LoginUser();
        newUser.UserName = userName;
        newUser.Password = password;
        newUser.ConfirmPassword = confirmPassword;

        this.userService.LoginUser(newUser).subscribe(
            (token:Token) => {                
                this.authenticationService.ChangedLoginTriger(true, token.userName); 
                this.CheckLogined();
                
            }, error => { console.log(error) });
    }

    private CheckLogined() {
        this.authenticationService.castedTriggerLogin.subscribe(
            (flag: boolean) => {
                if (flag) {
                   this.router.navigate(['']);
                }
            }
        );
    }
}

export class Token{
    access_token:string;
    userName: string;
    expires_in:string    
}