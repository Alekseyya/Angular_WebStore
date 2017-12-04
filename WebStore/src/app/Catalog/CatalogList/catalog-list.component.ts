import { Component} from '@angular/core';
import { PictureService } from '../../Services/picture.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Picture } from '../../Entities/picture';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Entities/product';
import { PagerService } from '../../Services/pager.service'


@Component({
  selector: 'catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css'],
  providers: [PictureService, ProductService,PagerService]
})
export class CatalogList implements OnInit {
 
  BootstrapColumn ="col-md-3";

  Pictures:Array<Picture> =[]
  TmpPicture: any;

  Products: Array<Product> =[];
  Product: Product;

  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  

  constructor(private pictureService: PictureService,
    private pagerService: PagerService, private productService: ProductService){
  }

  ngOnInit() {
    this.productService.GetProducts().subscribe((data: Array<Product>) => {

      for (let product of data) {       
        let newProduct = new Product(product.Name, product.Descriptions, product.Price,
          product.Count);
        newProduct.Pictures = product.Pictures;
        this.Products.push(newProduct);
      }
      this.setPage(1);

    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }    
    // get pager object from service
    this.pager = this.pagerService.getPager(this.Products.length, page);    

    // get current page of items
    this.pagedItems = this.Products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(this.Products);
    console.log(this.pagedItems);
  }


 
 }
