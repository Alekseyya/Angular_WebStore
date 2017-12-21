import { Injectable, SimpleChanges } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Subject } from "rxjs/Subject";
import { Product } from "../Entities/product";
import { AuthenticationService } from "./authentication.service";
import { UserService } from "./user.service";
import { findLast } from "@angular/compiler/src/directive_resolver";
import { Observable } from "rxjs/Observable";


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
        private userService: UserService) {

        this.userService.GetUsers().subscribe(
            users => {
                for (let user of users) {
                    if (this.SearchCookieForUserName(user.UserName)) {                        
                        this.UserName = user.UserName;
                        this.GetAllProductsInCookie(this.UserName);
                    }
                }
            });
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
                this.AddProductToCookies(product.Name, product.Count);
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
            this.DeleteProductInCookie(deleteProduct);
    
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

    DeleteProductInCookie(product){
        var productName = product.Name;
        var cookie:string = this.SearchCookieForUserName(this.UserName);
        var newCookie = this.DecrementProductInCookie(cookie, productName);
        if(newCookie == ''){

        }
        this.DecrementProductInCookie(cookie, productName)        
        this.SetCookie(newCookie, 1);         
    }

    private DecrementProductInCookie(cookie:string, productName){
        var indexProduct = cookie.indexOf(productName);
        
         if(indexProduct!=-1){            
             var numberProductInCookie:number = indexProduct + productName.length+1;
             var numberProduct = cookie[numberProductInCookie];
             var newNumberProduct:number = parseInt(numberProduct) - 1;
             let newCookie:string;
             if(newNumberProduct==0){
                newCookie=  this.DeleteNullProductInCookieListProducts(cookie, indexProduct, productName); 
             }else{
                newCookie = cookie.substring(0, numberProductInCookie) + newNumberProduct.toString() + cookie.substring(numberProductInCookie + 1, cookie.length);
             }                    
             
             return newCookie;
             
         }       
         return '';
    }

    DeleteNullProductInCookieListProducts(cookie:string, indexProduct:number, productName:string):string{
        let numberCharProduct = productName.length;
        let leftSeparator = cookie[indexProduct-1];
        let indexLeftSeparartor:number = cookie.indexOf(leftSeparator);
        let leftSubstring:string = cookie.substring(0, indexProduct);
        

        // +2 "," and  count products decimal number "3"
        let indexRightSeparator = indexProduct + numberCharProduct + 2;
        let rightSeparator = cookie[indexRightSeparator];
        let rightSubstring = cookie.substring(indexRightSeparator, cookie.length);
        

        let newCookie:string;
        if(leftSeparator == "[" && rightSeparator == ":"){
          newCookie = leftSubstring + cookie.substring(indexRightSeparator + 1, cookie.length);            
            
        }
        if(leftSeparator == ":" && rightSeparator == ":"){
            newCookie = cookie.substring(0, indexProduct-1) + cookie.substring(indexRightSeparator, cookie.length);
        }
        if(leftSeparator == ":" && rightSeparator == "]"){
            newCookie = cookie.substring(0, indexProduct - 1) + cookie.substring(indexRightSeparator, cookie.length);
        }
        if(leftSeparator == "[" && rightSeparator == "]"){
            newCookie = cookie.substring(0, indexProduct-1);
        }
        return newCookie;
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

    public GetAllProductsInCookie(userName: string) {
        var cookie = this.SearchCookieForUserName(userName);
        var listitemsWithoutComma = cookie.substring(cookie.indexOf("[") + 1, cookie.indexOf("]"));
        if (listitemsWithoutComma) {
            var listItems = listitemsWithoutComma.split(":");

            var listProducts: Array<ProductInCartDropdownList> = [];
            for (var item of listItems) {
                var itemArray = item.split(",");
                var tmpProduct = new ProductInCartDropdownList();
                tmpProduct.ProductName = itemArray[0]
                tmpProduct.Count = +itemArray[1];
                listProducts.push(tmpProduct);
            }
            this.cartDropdownList = listProducts;
            this.productsInCart.next(listProducts);
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
            var newValueCookie = this.IncrementProductInCookie(cookie, productName, productCount)
             if(newValueCookie == ''){                
                var tmpString =  ":" + productName + "," + productCount + "]";                   
                newCookieValue = cookie.replace("]", tmpString);
                console.log(newCookieValue);
                this.SetCookie(newCookieValue, 1); 
             } else{                
                this.SetCookie(newValueCookie,1);
             }
        }
          
    }

    

    private IncrementProductInCookie(cookie:string, productName:string, productCount:number):string{
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

export class ProductInCartDropdownList {
    ProductName:string;
    Count:number;
}

