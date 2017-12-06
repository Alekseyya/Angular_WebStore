import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'catalogfilter'
})
export class CatalogFilterPipe implements PipeTransform {
 transform(phones: Array<string>, filter?:string): any {   
    if(filter === undefined) return phones;
    if(filter.length < 2) return phones;

    var tmpArray = Array<string>();

    for(let phone of phones){  
      if(phone.toLowerCase().includes(filter)){
        tmpArray.push(phone.toLowerCase());
      }
    }
    return tmpArray;

   
 }
}