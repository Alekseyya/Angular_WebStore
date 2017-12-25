import { Component, SimpleChanges } from '@angular/core';
import { ProductItem } from '../Entities/product';
import { CartService } from '../Services/cart.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { OrderService } from '../Services/order.service';
import { Order } from '../Entities/order';
import { UserService } from '../Services/user.service';
import { ProductService } from '../Services/product.service';
import { CookieService } from '../Services/cookie.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],

})
export class CartComponent implements OnInit {
  products: Array<ProductItem> = [];
  count:string;
 
  UserName:string;

  ngOnInit(): void {
    // this.cartService.castedProducts.subscribe(
    //   (products: Array<ProductItem>) => {
    //     console.log(products);
    //     this.products = products;
    //   }
    // );


    this.ReadProductsInCookie();
    
  }

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private userService: UserService,
              private productService: ProductService,
              private cookieService: CookieService) { 
  }

  DeleteProduct(product: ProductItem) {
    this.cartService.DeleteProduct(product);
  }

  LessQuantityProduct(product: ProductItem) {
    for (let productItem of this.products) {
      if (product.Name == productItem.Name && product.Descriptions == productItem.Descriptions) {
        if (productItem.Count >= 2) {
          productItem.Count = productItem.Count - 1;
        }
      }
    }
  }
  
  //прочитать из кукисов товары, найти их в бд и отобразить

  ReadProductsInCookie(){
    
    const loadUser = new Promise((resolve, reject) => {
      this.userService.GetUsers().subscribe(
        users => {
          for (let user of users) {
            if (this.cookieService.SearchCookieForUserName(user.UserName)) {
              this.UserName = user.UserName;
               let listProducts = this.cookieService.GetAllProductsInCookie(this.UserName);
              resolve(listProducts);
            }else{
              reject();
            }            
          }
        });
    })

    loadUser.then((listProducts)=>{
      //var a = this.productService.GetProductsForCart().subscribe();
    })

    loadUser.catch((res)=>{
      console.log("Don't have cookir for user.")
    })
    
    //
  }

  MoreQuantityProduct(product: ProductItem) {
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

  AddToOrder(product:ProductItem){
    let newOrder:Order = new Order();
   
    
  } 


}