import { Component, SimpleChanges } from '@angular/core';
import { Product } from '../Entities/product';
import { CartService } from '../Services/cart.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { OrderService } from '../Services/order.service';
import { Order } from '../Entities/order';
import { UserService } from '../Services/user.service';



@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],

})
export class CartComponent implements OnInit {
  products: Array<Product> = [];
  count:string;
 

  ngOnInit(): void {
    this.cartService.castedProducts.subscribe(
      (products: Array<Product>) => {
        console.log(products);
        this.products = products;
      }
    );
  }

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private userService: UserService) {    
    this.products = this.cartService.products;
    console.log(this.cartService.products);

  }

  DeleteProduct(product: Product) {
    this.cartService.DeleteProduct(product);
  }

  LessQuantityProduct(product: Product) {
    for (let productItem of this.products) {
      if (product.Name == productItem.Name && product.Descriptions == productItem.Descriptions) {
        if (productItem.Count >= 2) {
          productItem.Count = productItem.Count - 1;
        }
      }
    }
  }

  MoreQuantityProduct(product: Product) {
    console.log(product);
    for (let productItem of this.products) {
      if (product.Name == productItem.Name && product.Descriptions == productItem.Descriptions) {
        if (productItem.Count >= 1 && productItem.Count <= 10) {
          productItem.Count = productItem.Count + 1;
        }
      }
    }
    console.log(this.products);
  }

  Test(value){
    alert(value);
  }

  ChangeQuantityProduct(value) {
   
    console.log(value);
    console.log(this.count);
    
    
    // for (let productItem of this.products) {
    //   if (product.Name == productItem.Name && product.Descriptions == productItem.Descriptions) {
    //     if (productItem.Count >= 1)
    //       productItem.Count = product.Count;
    //   }
    // }
    // console.log(this.products);

  }

  AddToOrder(product:Product){
    let newOrder:Order = new Order();
   
    
  } 


}