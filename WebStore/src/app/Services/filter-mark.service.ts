import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Subject } from "rxjs/Subject";
import { ProductService } from '../Services/product.service';
import { Product } from "../Entities/product";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Injectable()
export class FilterMarkService implements OnInit {
    

    constructor(private productService: ProductService) {
        this.productService.GetProducts().subscribe((products: Array<Product>) => {
            for (let product of products) {
                let newProduct = new Product(product.Name, product.Descriptions, product.Price,
                    product.Count);
                newProduct.Pictures = product.Pictures;
                this.Products.push(newProduct);
            }                   
        });
    }

    private Products: Array<Product> = [];
    public subjectProducts = new Subject<Array<Product>>();
    public castProducts = this.subjectProducts.asObservable();


    ngOnInit(): void {
        // this.productService.GetProducts().subscribe((products: Array<Product>) => {
        //     for (let product of products) {
        //         let newProduct = new Product(product.Name, product.Descriptions, product.Price,
        //             product.Count);
        //         newProduct.Pictures = product.Pictures;
        //         this.Products.push(newProduct);
        //     }
        //     console.log("!!!!");            
        // });
    }

    public FindProduct(mark:string){ 
        var newListProducts = this.SearchMarkInListProducts(mark);                            
        if (newListProducts != null) {            
            this.subjectProducts.next(newListProducts);
        }
        else{
            console.log("empty Products");
        }
    }

    private SearchMarkInListProducts (findMark:string):Array<Product>{
        var tmpListProducts = new Array<Product>();        
        for(let product of this.Products){            
            if(product.Name.toLowerCase().includes(findMark.toLowerCase())){
                tmpListProducts.push(product);
              }
        }        
        if(tmpListProducts.length!= 0){ 
                       
            return tmpListProducts;
        }
        return null;
    }


    // //must be initially list
    // private listMarks = ["Mazda", "BMW", "Opel"]
    // public subject  = new BehaviorSubject<Array<string>>(this.listMarks); 
    // castedMarks = this.subject.asObservable(); 

    // public Find(mark:string){
    //     //set function find elemet to list
    //     var newListmarks = this.SearchMarkInListMarks(mark);
    //     if (newListmarks != null) {
    //         //set new list
    //         this.subject.next(newListmarks);
    //     }
    // }

    // public AddToMarksList(mark:string){
    //     this.listMarks.push(mark);
    //     this.subject.next(this.listMarks)
    // }

    // private SearchMarkInListMarks (findMark:string):Array<string>{
    //     var tmpListMarks = new Array<string>();
    //     for(let mark of this.listMarks){
    //         if(mark.toLowerCase().includes(findMark)){
    //             tmpListMarks.push(mark);
    //           }
    //     }
    //     if(tmpListMarks.length!=null){
    //         return tmpListMarks;
    //     }
    //     return null;
    // }
}