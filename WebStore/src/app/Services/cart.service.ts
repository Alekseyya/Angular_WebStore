import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Subject } from "rxjs/Subject";
import { Product } from "../Entities/product";


@Injectable()
export class CartService {
    products:Array<Product> = [];
    private productsSubject  = new Subject<Array<Product>>();

    public castedProducts = this.productsSubject.asObservable();
    public numberInCart:number = this.products.length;

    constructor() {}
    
    AddProduct(product:Product){
        if(product != null && product != undefined){
            this.products.push(product);
            console.log(this.products.length);
            this.numberInCart = this.products.length;
            this.productsSubject.next(this.products);
        }
    }
    
    DeteProduct(product:Product){
        if(product != null && product != undefined){
            for(let productItem of this.products){
                if(productItem.Name == product.Name && productItem.Descriptions == product.Descriptions){
                   let index = this.products.indexOf(productItem);
                    if (index > -1) {
                        this.products.splice(index,1);
                        this.numberInCart = this.products.length;
                        this.productsSubject.next(this.products);
                    }
                }
            }
        }
    }

    AddToOrder(){

    }

}