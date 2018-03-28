import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../app-services/data/data-service.service';

@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResponsePageComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getResponsefromLocalStroage();
  }
  getResponsefromLocalStroage(){
    console.log(this.dataService.getLocalStroageUser())
  }

  

}
