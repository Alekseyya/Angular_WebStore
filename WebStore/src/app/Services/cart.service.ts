import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Subject } from "rxjs/Subject";
import { Product } from "../Entities/product";


@Injectable()
export class CartService {
    private products:Array<Product> = [];

    private productsSubject  = new Subject<Array<Product>>();
    castedProducts = this.productsSubject.asObservable();
    
    AddProduct(product:Product){
        if(product != null && product != undefined){
            this.products.push(product);
            this.productsSubject.next(this.products);
        }
    }
    
    DeteProduct(product:Product){
        if(product != null && product != undefined){
            for(let productItem of this.products){
                if(productItem.Name == product.Name && productItem.Descriptions == product.Descriptions){
                    
                }
            }
        }
    }

}