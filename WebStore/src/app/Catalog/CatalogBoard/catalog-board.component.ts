import { Component} from '@angular/core';
import { Product } from '../../Entities/product';
import { Mark } from '../../Entities/mark';
import { ProductService} from '../../Services/product.service';
import { MarkService} from '../../Services/mark.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'catalog-board',
  templateUrl: './catalog-board.component.html',
  styleUrls: ['./catalog-board.component.css'],
  providers: [ProductService, MarkService]
})
export class CatalogBoard implements OnInit {
 
  BootstrapColumn ="col-md-3";

  Products: Array<Product> = [];
  Product: Product;

  MarksColumn: Array<Array<Mark>> = [];
  Mark: Mark;

  constructor(private productService: ProductService, private markService: MarkService ){
  }

  ngOnInit() {  
        this.markService.GetMarks().subscribe((data:Array<Mark>)=>{
          let tmpListMarks = Array<Mark>();
          for(let item of data){
            tmpListMarks.push(new Mark(item.Name));
          }          
          this.MarksColumn= this.BreackUpColumns(10,tmpListMarks);
        });         
      }

  TestClick(){    
    this.productService.GetProductByName();    
  }

  BreackUpColumns(numbersInColumn:number, marks: Array<Mark>): Array<Array<Mark>> {
    let doubleArray = new Array<Array<Mark>>();
    let tmpArray: Array<Mark> = [];
    let counter = 0;    
    for (let mark of marks) {
      counter++;
      
      if(counter<=10){
        tmpArray.push(mark);
      }
      if(counter==10){
        counter = 0;
        doubleArray.push(tmpArray);
        tmpArray = new Array<Mark>();
      }
    }
    return doubleArray;
  }
 }

