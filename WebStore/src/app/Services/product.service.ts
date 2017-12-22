import { Product } from '../Entities/Product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
        let k =  this.http.post(this.ProductsUrl + "/testmethod", product);
        debugger;
k.toPromise().then(e => {debugger;});
    }

    GetProductsForRequest(products: Array<Product>){
        let tmpProducts:Array<object> = [];
        for(let product of products){
            let tmp = { Name: product.Name}
            tmpProducts.push(tmp);
        }
        this.http.post(this.ProductsUrl + "/getproducts", tmpProducts);
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