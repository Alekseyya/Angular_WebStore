import { Injectable } from '@angular/core';
import { Order } from '../Entities/order';
import { Product } from '../Entities/product';
import { forEach } from '@angular/router/src/utils/collection';
import { CartService } from './cart.service';
import { ProductService } from './product.service';
import { CookieService } from './cookie.service';

@Injectable()
export class OrderService {
    Orders: Array<Order> = [];
    

    constructor(
        private cartService: CartService, 
        private productService:ProductService,
        private cookieService: CookieService
        ) {}

    public CreateNewOrder(products: Array<Product>){
        let newOrder = new Order();
        newOrder.Id = this.FindLastIndexOrder();
        newOrder.OrderDate = this.DateNow();
        
    }

    public GetAllProductsInCookie(userName:string){
        let listProductsInCookie:Array<Product> = new Array<Product>();
        let listItems = this.cookieService.GetAllProductsInCookie(userName);
        
        for(let item of listItems){
            let itemArray = item.split(",");            
            var tmpProduct = new Product(itemArray[0], "", 0, itemArray[1]);
            listProductsInCookie.push(tmpProduct);
        }

        this.productService.GetProductsForRequest(listProductsInCookie);
        //сравнить и создать список продуктов
        //отпривать данный список, чтобы он мне вернул его из бд
        
        
    }

    public FindLastIndexOrder():number{
        let maxId:number = this.Orders[0].Id;
        for(let order of this.Orders){
            if(order.Id > maxId){
                maxId = order.Id;
            }
        }
        let newId = maxId + 1;
        return  newId;
    }

    public DateNow(): string {
        let dateNow = new Date();
        let date = dateNow.toDateString();
        let time = dateNow.toTimeString();
        return date + time;
    }

    public AddOrder(order: Order) {
        if (order != null && order != undefined) {
            this.Orders.push(order);
        }
        else {
            throw console.log("Order is empty or undefined");
        }
    }

    public RemoveOrder(removableOrder: Order) {
        if (removableOrder != null && removableOrder != undefined) {
            var indexRemotableOrder = this.Orders.indexOf(removableOrder);
            if(indexRemotableOrder){
                this.Orders.splice(indexRemotableOrder,1);
            }else{
                throw console.log("Order not found");
            }
            
        } else {
            throw console.log("Order is empty or undefined");
        }
    }
    
    public FindProductInOrders(productName:string):Array<Order>{
        let orders:Array<Order> = [];
        for(let order of this.Orders){
            for(let product of order.Products){
                if(product.Name == productName){
                    orders.push(order);
                }
            }
        }
        return orders;
    }

    public FindOrderById(id:number):Order{
        for(let order of this.Orders){
            if(order.Id == id){
                return order;
            }
        }
        return null;
    }

}