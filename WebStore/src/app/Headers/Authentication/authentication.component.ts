import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
// import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

@Component({
    selector: 'autentication-zone',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements  OnInit{

    ngOnInit(): void {
       this.authenticationService.castedTriggerLogin.subscribe(
           (trigger:boolean) => {
               if(trigger){                
                 this.registerComplited = true;
                 this.userName = this.authenticationService.userName;
               }              
           }
       )
    }
    
    
    private registerComplited: boolean = false;
    userName: string;

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        
     }
    


    Logout() {        
        this.authenticationService.DeleteCookie();     
        this.router.navigate(['']);
    }
}