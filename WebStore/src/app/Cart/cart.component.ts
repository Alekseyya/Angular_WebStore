import { Component} from '@angular/core';
import { Product } from '../Entities/product';


@Component({
  selector: 'cart',
  templateUrl: '/cart.component.html',
  styleUrls: ['./cart.component.css'],
 
})
export class CartComponent {
  products:Array<Product> =[];
  

}