import { Injectable, SimpleChanges } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Subject } from "rxjs/Subject";
import { Product } from "../Entities/product";
import { AuthenticationService } from "./authentication.service";
import { UserService } from "./user.service";
import { findLast } from "@angular/compiler/src/directive_resolver";


@Injectable()
export class CartService {

    products: Array<Product> = [];
    private productsSubject = new Subject<Array<Product>>();

    public castedProducts = this.productsSubject.asObservable();
    public numberInCart: number = this.products.length;

    private UserName: string;

    constructor(private authenticationService: AuthenticationService,
        private userService: UserService) {
        this.userService.GetUsers().subscribe(
            users => {
                for (let user of users) {
                    if (this.SearchCookieForUserName(user.UserName)) {                        
                        this.UserName = user.UserName;
                    }
                }
            });
    }


    AddProduct(product: Product) {
        if (product != null && product != undefined) {
            this.products.push(product);
            this.numberInCart = this.products.length;
            this.productsSubject.next(this.products);
            this.AddProductToCookies(product.Name, product.Count);

            //test
            //this.GetAllProductsInCookie(this.UserName)
        }
    }

    DeteProduct(product: Product) {
        if (product != null && product != undefined) {
            for (let productItem of this.products) {
                if (productItem.Name == product.Name && productItem.Descriptions == product.Descriptions) {
                    let index = this.products.indexOf(productItem);
                    if (index > -1) {
                        this.products.splice(index, 1);
                        this.numberInCart = this.products.length;
                        this.productsSubject.next(this.products);
                    }
                }
            }
        }
    }

    public GetAllProductsInCookie(userName: string) {
        var cookie = this.SearchCookieForUserName(userName);             
        var listitemsWithoutComma = cookie.substring(cookie.indexOf("[")+1, cookie.indexOf("]"));
        var listItems = listitemsWithoutComma.split(":");
        
        var listProducts:Array<object> = [];
        for(var item of listItems){
            var itemArray = item.split(",");
            var tmpProduct = {name:itemArray[0], count:itemArray[1]};
            listProducts.push(tmpProduct);
        }

    }

    private SetCookie(value, exdays) {
        var date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = "" + value + ";" + expires + ";path=/";
    }

    public AddProductToCookies(productName: string, productCount: number) {  
        
        var cookie:string = this.SearchCookieForUserName(this.UserName);
        var newCookieValue:string;        
        if(cookie.indexOf("]")==-1){            
            newCookieValue  = cookie + "[" + productName + "," + productCount + "]";
            console.log(newCookieValue);
            this.SetCookie(newCookieValue, 1);  
        }else{
            var newValueCookie = this.IncrementProduct(cookie, productName, productCount)
             if(newValueCookie == ''){
                 console.log("Not found");
                var tmpString =  ":" + productName + "," + productCount + "]";                   
                newCookieValue = cookie.replace("]", tmpString);
                console.log(newCookieValue);
                this.SetCookie(newCookieValue, 1); 
             } else{
                 console.log(newValueCookie);
                 console.log("found");
                this.SetCookie(newValueCookie,1);
             }
        }
          
    }

    private IncrementProduct(cookie:string, productName:string, productCount:number):string{
        var indexProduct = cookie.indexOf(productName);
       
        if(indexProduct!=-1){            
            var numberProductInCookie:number = indexProduct + productName.length+1;
            var numberProduct = cookie[numberProductInCookie];
            var newNumberProduct = productCount + +numberProduct;
                    
            var newCookie = cookie.substring(0, numberProductInCookie) + newNumberProduct.toString() + cookie.substring(numberProductInCookie + 1, cookie.length);
            return newCookie;
            
        }       
        return '';
    }

    private SearchCookieForUserName(userName: string): string {
        var numberChar = userName.length;
        var decodedCookie = decodeURIComponent(document.cookie);

        var arrayCookies = decodedCookie.split(';');
        for (var i = 0; i < arrayCookies.length; i++) {
            var cookie = arrayCookies[i].trim();
            var findedUsername = cookie.substring(0, numberChar);
            if (userName == findedUsername) {
                return cookie;
            }
        }
        return "";
    }

    AddToOrder() {

    }

}

