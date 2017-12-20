import { Component} from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { OrderService } from '../Services/order.service'
import { Order } from '../Entities/order';

@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']    
  })
  export class OrderComponent implements OnInit {
    Orders:Array<Order> = [];
      constructor(private orderService:OrderService) {}

    ngOnInit(): void {
        this.Orders = this.orderService.Orders;
    }

    DeleteOrder(order:Order){
        this.orderService.RemoveOrder(order);
    }

    ShowAdditionalInformation(order:Order){

    }

  }