import { Component} from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  nameList = ["first", "second", "therd"];
 
  constructor(private router: Router){}
  onChanged(increased: any) {
    console.log(increased);
  }
  
 }