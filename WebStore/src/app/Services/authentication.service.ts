import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Subject } from "rxjs/Subject";
import { UserService } from "./user.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { LoginUser } from "../Entities/login-user";


@Injectable()
export class AuthenticationService implements OnInit {
    
    private logined:boolean = false;
    public userName:string = "";    
    

    constructor(private userService: UserService) {
        this.userService.GetUsers().subscribe(
            (users:Array<LoginUser>) => { 
                this.FindUserForUpdatePage(users); 
            }
        );
    }

    private FindUserForUpdatePage(users:Array<LoginUser>){
        if(users!=null){
            for(let user of users){
                if(this.CheckUserNameInCookies(user.UserName)){
                    this.ChangedLoginTriger(true, user.UserName);
                }
            }
        }else{
            console.log("no users")
        }
    }

    private CheckUserNameInCookies(userName:string):boolean{
        var user = this.GetCookie(userName);
        if(user){
            return true;
        }
        return false;
    }

    ngOnInit(){
        // this.userService.GetUsers().subscribe(
        //     (users:Array<LoginUser>) => {   
        //         if(users!=null){
        //            for(let user in users){
        //               console.log(user); 
        //            }     
        //             this.users = users;
        //         }else{
        //             console.log("no users")
        //         }

        //     }
        // );
    }

    
    private tiggerSubjectLogin  = new BehaviorSubject<boolean>(this.logined);
    castedTriggerLogin = this.tiggerSubjectLogin.asObservable(); 

    
    
    SetCookie(name, value, exdays) {
        var date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }


    private GetCookie(name:string) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    public DeleteCookie() {
        document.cookie = "" + this.userName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    
    ChangedLoginTriger(trigger:boolean, userName?:string){
        this.userName = userName;
        this.tiggerSubjectLogin.next(trigger);               
    }
}