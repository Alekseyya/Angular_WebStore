import { Component} from '@angular/core';
import { PictureService } from '../../Services/picture.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Picture } from '../../Entities/picture';
import { ProductItem } from '../../Entities/product';

import { PagerService } from '../../Services/pager.service';
import { ProductService } from '../../Services/product.service';
import { FilterMarkService } from '../../Services/filter-mark.service';
import { CartService } from '../../Services/cart.service';
import { Car } from '../../Entities/car';


@Component({
  selector: 'catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css'],
  providers: [PictureService, PagerService]
})
export class CatalogList implements OnInit {
 
  BootstrapColumn ="col-md-3";

  // Pictures:Array<Picture> =[]
  // TmpPicture: any;

  Products: Array<ProductItem> =[];
  // Product1: Product;

  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  
  // phones = ["iPhone 7", "LG G 5", "Honor 9", "Idol S4", "Nexus 6P"];

  constructor(
    private cartService:CartService,
    private pictureService: PictureService,
    private pagerService: PagerService, 
    private productService: ProductService,
    private filterMarkService :FilterMarkService){
  }

  ngOnInit() {
    this.productService.GetProducts().subscribe((data: Array<ProductItem>) => {      
      for (let product of data) {       
        let newProduct = new ProductItem(product.Name, product.Descriptions, product.Price,
          product.Count);
        newProduct.Id = product.Id;
        newProduct.Pictures = product.Pictures;
        this.Products.push(newProduct);
      }      
      this.setPage(1);

    });
    //add change callback list products
    this.filterMarkService.castProducts.subscribe(
      (productsList: Array<ProductItem>) => {        
        this.Products = productsList;
        this.setPage(1);
      });    
  }  

  public Buy(product:ProductItem){
    this.cartService.AddProduct(product);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }    
    // get pager object from service
    this.pager = this.pagerService.getPager(this.Products.length, page);    

    // get current page of items
    this.pagedItems = this.Products.slice(this.pager.startIndex, this.pager.endIndex + 1);    
  }
 
 }

