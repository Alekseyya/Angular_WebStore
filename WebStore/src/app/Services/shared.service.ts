import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject"

@Injectable()
export class SharedService {

    public user  = new BehaviorSubject<string>("john"); 
    cast = this.user.asObservable(); 

    EditUser(newUser:string){
      this.user.next(newUser);      
    }
}