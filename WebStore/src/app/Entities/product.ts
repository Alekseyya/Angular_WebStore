export class Product{
    Name:string;
    Descriptions:string;
    Price:number;
    Count:number;
   
    constructor(name:string, descriptions:string, price:number, count:number) {   
      this.Name = name;
      this.Descriptions = descriptions;
      this.Price = price;
      this.Count = count;
    }
  }