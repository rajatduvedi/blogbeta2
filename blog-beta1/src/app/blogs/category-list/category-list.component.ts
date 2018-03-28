import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../app-services/data/data-service.service';
import { ICategory, Category, IBlog, Blog} from '../../models/blog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryListComponent implements OnInit {
    categoryList= []

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

  gotToBlockListBySubcategory(cat, subcat){
    this.router.navigate(['/topics',cat, subcat]);
  }

}
