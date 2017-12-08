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
    
    findMark:string;
    newMark:string;

    constructor(private sharedService: SharedService) {}

    ngOnInit() { 
        // this.sharedService.castedMarks.subscribe((user:Array<string>) => { 
        //     this.user = user;
        //    });      
    }

    FindMark(){
      this.sharedService.Find(this.findMark);   
    }

    passToSubject(){        
        this.sharedService.AddToMarksList(this.newMark);  
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