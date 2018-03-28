import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../app-services/data/data-service.service';
import { ICategory, Category, IBlog, Blog} from '../../models/blog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeHeaderComponent implements OnInit {
  categoryList= [];



  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.ListCategory()

  }

  ListCategory() {
    this.dataService.getAllCategory()
      .subscribe(
        res =>{
          console.log(res);
          this.categoryList = res;
          console.log(this.categoryList);
        }
      )
  }

  goToAllCategoryPage(){
    this.router.navigate(['/blog/topics'])
    // alert("  +To Do+ // go to all category page")
  }

  goToBlogList(data){
    console.log(data);
    this.router.navigate(['/topics',data]);
  }

}
