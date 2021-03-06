import { ProductItem } from "./product";
import { User } from "./user";

export class Order {
    Id:number;
    Products:Array<ProductItem>;
    Quantity:number;
    OrderDate:string;
    User: User;

    constructor() {
        this.Products = [];
    }
}