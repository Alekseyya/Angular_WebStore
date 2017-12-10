import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Subject } from "rxjs/Subject";


@Injectable()
export class AuthenticationService {
    
    private logined:boolean = false;
    private userNameSubject = new Subject<string>();
    private tiggerSubjectLogin  = new BehaviorSubject<boolean>(this.logined);
    castedTriggerLogin = this.tiggerSubjectLogin.asObservable(); 
    castUserName = this.userNameSubject.asObservable();
    
    ChangedLoginTriger(trigger:boolean){
        this.tiggerSubjectLogin.next(trigger);               
    }
    ChangeLoginName(loginName:string){
        this.userNameSubject.next(loginName);
    }

}