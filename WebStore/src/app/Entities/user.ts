import { UserInformation } from "./user-information";
import { Order } from "./order";

export class User{
    UserName:string;
    Password:string;
    AdditionalInformation:UserInformation;
    Orders:Array<Order>;
    
    constructor() {
        this.Orders = [];        
    }
}