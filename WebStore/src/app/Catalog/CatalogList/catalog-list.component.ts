import { Component} from '@angular/core';
import { PictureService } from '../../Services/picture.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Picture } from '../../Entities/picture';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Entities/product';



@Component({
  selector: 'catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css'],
  providers: [PictureService, ProductService]
})
export class CatalogList implements OnInit {
 
  BootstrapColumn ="col-md-3";

  Pictures:Array<Picture> =[]
  TmpPicture: any;

  Products: Array<Product> =[];
  Product: Product;

  

  constructor(private pictureService: PictureService, private productService: ProductService){
  }

  ngOnInit() {

      this.pictureService.GetPictures().subscribe((data: Array<Picture>) => {

          for (let item of data) {
              this.Pictures.push(new Picture(item.Name, item.ImageBase64));
          }
          console.log()
          
      });   

        this.productService.GetProducts().subscribe((data:Array<Product>)=>{
                  
          for(let product of data){
            console.log(product.Pictures)
            let newProduct = new Product(product.Name, product.Descriptions, product.Price,
                product.Count);
            newProduct.Pictures = product.Pictures; 
            console.log(newProduct); 

            this.Products.push(newProduct);
          }
          
        });         
      }
 
 }

