import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'autentication-zone',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']    
})
export class AuthenticationComponent implements OnInit {

    ngOnInit(): void {
        this.authenticationService.castedTriggerLogin.subscribe((flag:boolean)=>{
            this.registerComplited = flag;
            this.userName =this.authenticationService.useName;          
        }); 
    }
    private registerComplited:boolean = false;
    userName:string;
    
    constructor(private authenticationService: AuthenticationService) {  
       this.userName = this.authenticationService.useName;        
    }


    Logout(){
        console.log("logoust");
        this.authenticationService.ChangedLoginTriger(false);
    }
}