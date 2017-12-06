import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'home-header',
    templateUrl: './home-header.component.html',
    styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent { 
    name:string;
    @Input() nameList:Array<string>;
    @Output() nameChange = new EventEmitter<Array<string>>();    
    onNameChange(model: string){
        
        let flag = this.FindInArray(model);
        if(flag){
            this.nameChange.emit(this.nameList);
        }
        
    }

    FindInArray(model:string):boolean{       
        var findElems = [];
        for(let name of this.nameList){
            if(name.toLowerCase() == model.toLowerCase()){                
                findElems.push(name);
            }
        }
        if(findElems.length!=0){            
            this.nameList = findElems;            
            return true;
        }
        return false;        
    }
}