import { Component, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../Services/authentication.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

@Component({
    selector: 'autentication-zone',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnChanges {

    ngOnInit(): void {
        this.authenticationService.castedTriggerLogin.subscribe((flag: boolean) => {
            this.registerComplited = flag;
            this.userName = this.authenticationService.useName;
        });
    }
    private registerComplited: boolean = false;
    userName: string;

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.userName = this.authenticationService.useName;
    }
    ngOnChanges() {

    }

    private GetCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    private DeleteCookie() {
        document.cookie = "" + this.userName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }


    Logout() {
        console.log("logoust");
        this.DeleteCookie();
        this.authenticationService.ChangedLoginTriger(false);
        this.router.navigate(['']);
    }
}