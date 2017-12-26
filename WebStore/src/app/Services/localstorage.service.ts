import { Injectable} from "@angular/core";
import { ProductLocalStorage } from "../Entities/product-localstorage";
import { UserService } from "./user.service";
import { CookieService } from "./cookie.service";
import { ProductService } from "./product.service";
import { ProductItem } from "../Entities/product";

@Injectable()
export class LocalStoreService { 

    UserName:string;
    ProductsInLocalStorage:Array<ProductLocalStorage> = [];

    constructor(
        private userService: UserService,
        private cookieService: CookieService,
        private productService: ProductService) {

        this.userService.GetUsers().subscribe(
            users => {
                for (let user of users) {
                    if (this.cookieService.SearchCookieForUserName(user.UserName)) {
                        this.UserName = user.UserName;
                        this.ProductsInLocalStorage = this.ReadLocalStorage(user.UserName);
                    }
                }
            });
    }

    public ReadLocalStorage(userName: string): Array<ProductLocalStorage> {
        if (userName) {
            let products: Array<ProductLocalStorage> = this.DeserializeOfJson(userName);
            if(products)
            return products;
        }
        return null;
    }

    public SetToLocalStorage(userName: string, data: ProductLocalStorage): void {
        if (data != null && userName.length != 0) {
            if (this.IsDataInLocalStorage(userName)) {
                let currentListProducts = this.ReadLocalStorage(userName);

                let listProducts: Array<ProductLocalStorage> = [];
                for (let product of currentListProducts) {
                    listProducts.push(product);
                }
                listProducts = this.AddNewProduct(listProducts, userName, data);                              

                let newData = this.SerializeToJson(listProducts);
                localStorage.removeItem(userName);
                localStorage.setItem(userName, newData);

                this.ProductsInLocalStorage = this.ReadLocalStorage(userName);

            } else {

                localStorage.setItem(userName, this.SerializeToJson(data));
            }
        }
    }

    //dublicate for one press
    private IsDublicate(listProducts, productName:string):boolean{        
            for(let product of listProducts){
                if(product.Name == productName){
                    return true;
                }
            }
            return false;  
    }

    private AddNewProduct(listProducts:Array<ProductLocalStorage>, 
                                        userName: string, product:ProductLocalStorage) {

        if (userName != '' && userName != undefined) {
            if (this.IsDublicate(listProducts, product.Name)) {                
                this.IncriaseCountDublicateProduct(listProducts, product.Name);
                return listProducts;
            } else{
                listProducts.push(product);
                return listProducts;
            }            
        } else {
            throw console.log("Uncurrect user name");
        }

    }

    private IncriaseCountDublicateProduct(listProducts, productName: string) {
        for (let product of listProducts) {
            if (product.Name == productName) {
                ++product.Count;
            }
        }
    }

    private IsDataInLocalStorage(userName: string): boolean {
        if (localStorage.getItem(userName)) {
            return true;
        }
        return false;
    }

    private DeserializeOfJson(userName: string): Array<ProductLocalStorage> {
        let items = JSON.parse(localStorage.getItem(userName));      
        if (items != null) {
            let newArray: Array<ProductLocalStorage> = [];
            if (typeof (items) == "object" && !Array.isArray(items)) {
                newArray.push(new ProductLocalStorage(items.Id, items.Name, items.Count));
            } else {
                for (let item of items) {
                    newArray.push(new ProductLocalStorage(item.Id, item.Name, item.Count));
                }
            }
            return newArray;
        }
        return null;
    }


    private SerializeToJson(data: any): string {
        return JSON.stringify(data);
    }

    public ClearLocalStorage(userName: string) {
        if (userName) {
            localStorage.removeItem(userName);
        }
    }

    public DeleteProduct(productName:string){        
        for(let index=0; index < this.ProductsInLocalStorage.length; index++){
            if(this.ProductsInLocalStorage[index].Name == productName){
               this.ProductsInLocalStorage.splice(index,1);
            }
        }
        
    }


}
