import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SharedService } from '../Services/shared.service';

@Component({
    selector: 'home-header',
    templateUrl: './home-header.component.html',
    styleUrls: ['./home-header.component.css']    
})
export class HomeHeaderComponent implements OnInit{ 
    
    user:string;
    changedUser:string;

    constructor(private sharedService: SharedService) {}

    ngOnInit() { 
        this.sharedService.cast.subscribe(user => { 
            this.user = user;
           });      
    }

    passToSubject(){        
        this.sharedService.EditUser(this.changedUser);  
    }
    
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