import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
    selector: 'autentication-zone',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']    
})
export class AuthenticationComponent {
    private registerComplited:boolean = false;
    userName:string;
    
    constructor(private authenticationService: AuthenticationService) {  
        this.authenticationService.castedTriggerLogin.subscribe((flag:boolean)=>{
            this.registerComplited = flag;
                      
        });
        this.authenticationService.castUserName.subscribe((userName: string) => this.userName = userName);
    }

    Logout(){
        this.authenticationService.ChangedLoginTriger(false);
    }
}