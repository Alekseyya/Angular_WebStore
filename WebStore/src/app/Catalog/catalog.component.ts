import { Component, OnInit } from '@angular/core';
import { SharedService } from '../Services/shared.service';


@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
 
})
export class CatalogComponent implements OnInit {
  user:string;
  
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.cast.subscribe(user => { 
      this.user = user;
     });
  }
}
