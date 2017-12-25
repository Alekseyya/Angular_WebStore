import { Picture } from '../Entities/picture'

export class ProductItem{
    Id:number;
    Name:string;
    Descriptions:string;
    Count:number;
    Price:number;
    Pictures:Array<Picture>=[];
   
    constructor(name:string, descriptions:string, price:number, count:number) {   
      this.Name = name;
      this.Descriptions = descriptions;
      this.Price = price;
      this.Count = count;               
    }
}