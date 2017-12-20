import { Injectable } from '@angular/core';
import { Order } from '../Entities/order';

@Injectable()
export class OrderService {
    Orders: Array<Order>;

    constructor() {
        this.Orders = [];
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