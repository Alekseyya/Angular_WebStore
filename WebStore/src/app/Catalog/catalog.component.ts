import { Component, OnInit } from '@angular/core';
import { SharedService } from '../Services/shared.service';


@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
 
})
export class CatalogComponent implements OnInit {
  listMarks = new Array<string>();
  
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.castedMarks.subscribe((listMarks : Array<string>) => { 
        this.listMarks = listMarks;        
     });
  }
}
