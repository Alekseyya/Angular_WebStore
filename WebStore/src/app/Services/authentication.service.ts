import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Subject } from "rxjs/Subject";


@Injectable()
export class AuthenticationService {
    
    private logined:boolean = false;
    public useName:string;
    
    private tiggerSubjectLogin  = new BehaviorSubject<boolean>(this.logined);
    castedTriggerLogin = this.tiggerSubjectLogin.asObservable(); 
    
    
    ChangedLoginTriger(trigger:boolean, userName?:string){
        this.useName = userName;
        this.tiggerSubjectLogin.next(trigger);               
    }
}