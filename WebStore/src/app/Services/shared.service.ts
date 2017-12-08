import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { Subject } from "rxjs/Subject";

@Injectable()
export class SharedService {

    //must be initially list
    private listMarks = ["Mazda", "BMW", "Opel"]
    public subject  = new BehaviorSubject<Array<string>>(this.listMarks); 
    castedMarks = this.subject.asObservable(); 

    public Find(mark:string){
        //set function find elemet to list
        var newListmarks = this.SearchMarkInListMarks(mark);
        if (newListmarks != null) {
            //set new list
            this.subject.next(newListmarks);
        }
    }

    public AddToMarksList(mark:string){
        this.listMarks.push(mark);
        this.subject.next(this.listMarks)
    }

    private SearchMarkInListMarks (findMark:string):Array<string>{
        var tmpListMarks = new Array<string>();
        for(let mark of this.listMarks){
            if(mark.toLowerCase().includes(findMark)){
                tmpListMarks.push(mark);
              }
        }
        if(tmpListMarks.length!=null){
            return tmpListMarks;
        }
        return null;
    }
}