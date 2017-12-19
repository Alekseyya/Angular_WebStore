import { Component, OnInit } from '@angular/core';
import { FilterMarkService } from '../Services/filter-mark.service';


@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
 
})
export class CatalogComponent implements OnInit {
  listMarks = new Array<string>();
  
  constructor(private filterMarkService: FilterMarkService) { }

  ngOnInit(): void {
    // this.filterMarkService.castedMarks.subscribe((listMarks : Array<string>) => { 
    //     this.listMarks = listMarks;        
    //  });
  }
}
