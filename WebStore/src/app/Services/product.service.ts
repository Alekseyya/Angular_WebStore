import { Product } from '../Entities/Product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    PruductsUrl: string = "http://localhost:54058/api/product";

    GetProducts() {
        return this.http.get(this.PruductsUrl + "/getproducts");
    }
    DeleteProduct(product: Product) {
        var newDeletedProduct = { Name: product.Name, Descriptions: product.Descriptions,
                                  Price: product.Price, Count: product.Count };
        return this.http.post(this.PruductsUrl + "/deleteproduct", newDeletedProduct);
    }
    AddProduct(product: Product) {
        var newProduct = { Name: product.Name, Descriptions: product.Descriptions,
                           Price: product.Price, Count: product.Count };
        return this.http.post(this.PruductsUrl + "/addproduct", newProduct);
    }
    UpdateProduct(product: Product) {
        var newUpdateProduct = { Name: product.Name, Descriptions: product.Descriptions,
                           Price: product.Price, Count: product.Count };
        return this.http.post(this.PruductsUrl + "/updateproduct", newUpdateProduct);
    }
}