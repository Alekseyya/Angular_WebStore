import { Product } from "./product";
import { User } from "./user";

export class Order {
    Id:number;
    Products:Array<Product>;
    Quantity:number;
    OrderDate:string;
    User: User;

    constructor() {
        this.Products = [];
    }
}