import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../app-services/data/data-service.service';
import { ICategory, Category, IBlog, Blog} from '../../models/blog.model';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-blog-table',
  templateUrl: './blog-table.component.html',
  styleUrls: ['./blog-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogTableComponent implements OnInit {
  blogModel= [];
  displayedColumns = ['blogId', 'category','subCategory','blogTitle', 'blogimageUrl', 'edit','view','delete'];
   dataSource : ExampleDataSource;

  constructor( private dataService: DataService) { }

  ngOnInit() {
    this.getBlogTable();
  }
  getBlogTable() {
    this.dataService.getAllBlogService()
      .subscribe(
        res => {
          console.log(res);
         this.blogModel = res;

         //  this.blogModel = res;
         this.dataSource = new ExampleDataSource(this.blogModel);
         // console.log(this.dataSource.data);
        },
        error => {
          console.log(error);
        },
        () => {

        }
      );
  }
}

export class ExampleDataSource extends DataSource<any> {
  constructor(private data: IBlog[]) {
    super();
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<IBlog[]> {

    return Observable.of(this.data);
  }

  disconnect() {}
}
