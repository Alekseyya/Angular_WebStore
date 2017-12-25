export class ProductLocalStorage{
    Id:number;
    Name:string;
    Count:number;
   
    constructor(id:number, name:string, count:number) {
        this.Id = id;
        this.Name = name;
        this.Count = count;
    }
}