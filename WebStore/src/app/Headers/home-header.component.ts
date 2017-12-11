import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FilterMarkService } from '../Services/filter-mark.service';
import { CartService } from '../Services/cart.service';
import { Product } from '../Entities/product';

@Component({
    selector: 'home-header',
    templateUrl: './home-header.component.html',
    styleUrls: ['./home-header.component.css']    
})
export class HomeHeaderComponent implements OnInit{ 
    
    findMark:string;
    newMark:string;
    numberInCart:number;
    products:Array<Product> = [];

    constructor(private cartService : CartService,
         private filterMarkService : FilterMarkService) {}

    ngOnInit() { 
        this.cartService.castedProducts.subscribe(
            (products: Array<Product>) => {                    
               this.numberInCart = this.cartService.numberInCart;
               this.products = products;
            }
        );
    }

    DeleteInCart(product:Product){
        this.cartService.DeteProduct(product);
    }

    Search(){        
        this.filterMarkService.FindProduct(this.findMark);
    }

    FindMark(){
      this.filterMarkService.Find(this.findMark);   
    }

    passToSubject(){        
        this.filterMarkService.AddToMarksList(this.newMark);  
    }
    
    // name:string;
    // @Input() nameList:Array<string>;
    // @Output() nameChange = new EventEmitter<Array<string>>();    
    // onNameChange(model: string){
        
    //     let flag = this.FindInArray(model);
    //     if(flag){
    //         this.nameChange.emit(this.nameList);
    //     }
        
    // }

    // FindInArray(model:string):boolean{       
    //     var findElems = [];
    //     for(let name of this.nameList){
    //         if(name.toLowerCase() == model.toLowerCase()){                
    //             findElems.push(name);
    //         }
    //     }
    //     if(findElems.length!=0){            
    //         this.nameList = findElems;            
    //         return true;
    //     }
    //     return false;        
    // }
}