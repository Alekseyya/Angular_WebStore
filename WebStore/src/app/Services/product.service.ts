import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProductItem } from '../Entities/product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    ProductsUrl: string = "http://localhost:54058/api/product";

    GetProducts() {
        return this.http.get(this.ProductsUrl + "/getproducts");
    }

    GetProductByName(){  
        // let result = JSON.stringify(a);
        const headers = new HttpHeaders();
        // headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        let product = {
            hello: "value"
        };       
        this.http.post(this.ProductsUrl + "/testmethod", product, {headers: headers}).toPromise();
        
    }

    GetProductsForCart(arrayProductsId:Array<number>): Observable<object>{ 
        if(arrayProductsId.length!=0){            
            
            let params = new HttpParams();
            for(let productId of arrayProductsId){
               params = params.append('productsId', productId.toString());
            }
          return this.http.get(this.ProductsUrl + "/GetProductsForCart", {params : params});
        }
    }

    // DeleteProduct(product: Product) {
    //     var newDeletedProduct = { Name: product.Name, Descriptions: product.Descriptions,
    //                               Price: product.Price, Count: product.Count };
    //     return this.http.post(this.PruductsUrl + "/deleteproduct", newDeletedProduct);
    // }

    // AddProduct(product: Product) {        
    //     var newProduct = { Name: product.Name, Descriptions: product.Descriptions,
    //                        Price: product.Price, Count: product.Count };        
    //     return this.http.post(this.PruductsUrl + "/addproduct", newProduct);
    // }

    // UpdateProduct(product: Product) {
    //     var newUpdateProduct = { Name: product.Name, Descriptions: product.Descriptions,
    //                        Price: product.Price, Count: product.Count };
    //     return this.http.post(this.PruductsUrl + "/updateproduct", newUpdateProduct);
    // }
}