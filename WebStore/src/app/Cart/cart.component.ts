import { Component, SimpleChanges} from '@angular/core';
import { Product } from '../Entities/product';
import { CartService } from '../Services/cart.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
 
})
export class CartComponent implements OnChanges {


  ngOnChanges(changes: SimpleChanges): void {
    this.cartService.castedProducts.subscribe(
      (products:Array<Product>) => {
        console.log(products);
        this.products = products;
      }
    );
  }
  products:Array<Product> =[];

  constructor(private cartService:CartService) {
    
    
  }
  

}