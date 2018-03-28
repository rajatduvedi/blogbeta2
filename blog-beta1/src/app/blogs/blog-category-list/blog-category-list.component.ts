import { Component, OnInit, OnDestroy,OnChanges, AfterContentInit, Input, ViewEncapsulation, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../app-services/data/data-service.service';
import { ICategory, Category, IBlog, Blog} from '../../models/blog.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-category-list',
  templateUrl: './blog-category-list.component.html',
  styleUrls: ['./blog-category-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogCategoryListComponent implements OnInit {

  @Input() passData:any;
  categorykey;
  subCategoryKey;
  blogModel= [];
  blogModelcon = [];
  urlstr=[];
  loadnumber =0;
  check;
  Showmsg;
  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {
    console.log("called");
  }

  ngOnInit() {

  this.route.params.subscribe(params => {
      this.categorykey = params['topics'];
      console.log(this.categorykey);
      // console.log(this.subCategoryKey);
      this.getBlogBycategory(this.loadnumber);
  });

  }
   getBlogBycategory(loadnumber){
     this.dataService.getBlogBycategory({categorykey: this.categorykey}, loadnumber)
      .subscribe(
        res =>{
          console.log(res);
          if(res.length){
            this.blogModelcon = res;
            this.Showmsg = '';
            this.check = 1;
          }
          else {
            this.blogModelcon = res;
            this.Showmsg = "Opps ! There is not any Blog available  for " + this.categorykey + '   category !';
            this.check = 0;
          }
        }
      )
   }

  }
