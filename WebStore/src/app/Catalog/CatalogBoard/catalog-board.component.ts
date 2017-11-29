import { Component} from '@angular/core';
import { Product } from '../../Entities/product';
import { ProductService} from '../../Services/product.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'catalog-board',
  templateUrl: './catalog-board.component.html',
  styleUrls: ['./catalog-board.component.css'],
  providers: [ProductService]
})
export class CatalogBoard implements OnInit {

  Products: Product[] = [];
  Product: Product;

  constructor(private productService: ProductService){
    
  }

  ngOnInit() {   
        this.productService.GetProducts().subscribe((data:Array<Product>)=>{
          console.log(data);  
          for(let item of data){
            this.Products.push(new Product(item.Name, item.Descriptions,
              item.Price, item.Count));
          }
        });        
      }
 }

