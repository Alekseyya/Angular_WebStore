import { Injectable, SimpleChanges } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Subject } from "rxjs/Subject";
import { Product } from "../Entities/product";
import { AuthenticationService } from "./authentication.service";
import { UserService } from "./user.service";
import { findLast } from "@angular/compiler/src/directive_resolver";
import { Observable } from "rxjs/Observable";
import { CookieService } from "./cookie.service";


@Injectable()
export class CartService {
    
    products: Array<Product> = [];
    cartDropdownList:Array<ProductInCartDropdownList> = [];
    
    private productsInCart = new Subject<Array<ProductInCartDropdownList>>();
    public castedProductsInCart = this.productsInCart.asObservable();

    private productsSubject = new Subject<Array<Product>>();

    public castedProducts = this.productsSubject.asObservable();
    public numberInCart: number = this.products.length;

    private UserName: string;

   

    constructor(private authenticationService: AuthenticationService,
        private userService: UserService , private cookieService: CookieService) {

        this.userService.GetUsers().subscribe(
            users => {
                for (let user of users) {
                    if (this.cookieService.SearchCookieForUserName(user.UserName)) {                        
                        this.UserName = user.UserName;
                        let listProducts = this.GetAllProductsInCookie(this.UserName);
                        this.UpdateCartDropdownList(listProducts);
                    }
                }
            });
    }

    public GetAllProductsInCookie(userName:string):Array<ProductInCartDropdownList>{

        let listItems = this.cookieService.GetAllProductsInCookie(userName);
        if(listItems){
            var listProducts: Array<ProductInCartDropdownList> = [];
            for (var item of listItems) {
                var itemArray = item.split(",");
                var tmpProduct = new ProductInCartDropdownList();
                tmpProduct.ProductName = itemArray[0]
                tmpProduct.Count = +itemArray[1];
                listProducts.push(tmpProduct);
            }            
            return  listProducts;
        }
        return null;
    }

    public UpdateCartDropdownList(productList:Array<ProductInCartDropdownList>){

        if(productList!=null){
            this.cartDropdownList = productList;
            this.productsInCart.next(productList);
        }
    }

    AddProduct(product: Product) {
        if (product != null && product != undefined) {
            if(!this.IncremetDuplicateProduct(product)){
                this.products.push(product);
                this.numberInCart = this.products.length;

                var productForCar = new ProductInCartDropdownList();
                productForCar.ProductName = product.Name;
                productForCar.Count = product.Count;
                this.cartDropdownList.push(productForCar);

                this.productsInCart.next(this.cartDropdownList);
                this.productsSubject.next(this.products);
                let cookie = this.cookieService.SearchCookieForUserName(this.UserName);
                this.cookieService.AddProductToCookies(cookie,product.Name, product.Count);
            }                 
        }
    }

    DeleteProduct(product) {
        if(product!=null && product!= undefined){
            var deleteProduct: object;
            if (product instanceof Product) {
                deleteProduct = { Name: product.Name };
    
            }
            if (product instanceof ProductInCartDropdownList) {
                deleteProduct = { Name: product.ProductName };
    
            }
    
            this.DeleteInProductList(deleteProduct);
            this.DeleteProductInDropdowListCart(deleteProduct);
            this.cookieService.DeleteProductInCookie(this.UserName, deleteProduct);
    
            this.numberInCart = this.products.length;
            this.productsSubject.next(this.products);
            this.productsInCart.next(this.cartDropdownList);
    
    
            console.log(this.products);
            console.log(this.cartDropdownList);
        }
    }

    DeleteInProductList(product){
        if (product != null && product != undefined) {            
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].Name == product.Name) {
                    if (this.products[i].Count == 1) {                    
                        this.products.splice(i,1);                    
                    } else
                    {
                        --this.products[i].Count;
                    }                
                }
            }
        }
    }
  
    DeleteProductInDropdowListCart(product) {        
        var newProductList: Array<Product> = [];
        if (product != null && product != undefined) {
            for (let i = 0; i < this.cartDropdownList.length; i++) {
                
                if (this.cartDropdownList[i].ProductName == product.Name) {
                    if (this.cartDropdownList[i].Count == 1) {
                        this.cartDropdownList.splice(i, 1);                        
                    } else {
                        --this.cartDropdownList[i].Count;
                    }
                }
            }
        }
    }


    private IncremetDuplicateProduct(product:Product):boolean{
        var flag:boolean = false;
        for(let selectProduct of this.products){
            if(selectProduct.Name == product.Name){
                selectProduct.Count += product.Count;
                flag = true;
            }
        }
        flag = false;
        for(let selectProduct of this.cartDropdownList){
            if(selectProduct.ProductName == product.Name){
                selectProduct.Count += product.Count;
                flag = true;
            }
        }         
        return flag;
    }

    
    

    

    public Checkout(){
        //send all products to order service

        //alert
        //clear all this.products and this.cartdropdownlist
        //call command in order service read all cookie
        //add cookie service

    }

    

    
    AddToOrder() {

    }

}

export class ProductInCartDropdownList {
    ProductName:string;
    Count:number;
}

