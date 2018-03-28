import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IBlog, Blog } from '../../models/blog.model';
import { DataService } from './../../../app-services/data/data-service.service';
import { DialogsService } from './../../../app-services/service/dialog/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogListComponent implements OnInit {
  blogModel= [];
  urlstr = [];
  constructor(private dataService: DataService, private router: Router, private dialogsService:DialogsService) { }

  ngOnInit() {
    // alert("hello")
    this.getAllBlog();
   this.urlstr = this.router.url.split("/");
   console.log(this.urlstr[1] + '/v')

  }
  getAllBlog() {
    this.dataService.getAllBlogService()
      .subscribe(
        res => {
          console.log(res);
          this.blogModel = res;
        },
        error => {
          console.log(error);
        },
        ()=>{

        }
      )
  }

  gotoBlogView(data) {
    // [routerLink]="['/'+this.urlstr[1]+'/blog-view']"
    console.log(data);
    this.router.navigate([this.urlstr[1]+'/blog/blog-view'], {queryParams: { blogId: data } });

  }

  editBlog(event){
    console.log(event);
    this.router.navigate([this.urlstr[1]+'/blog/blog-create'], {queryParams:{blogId: event}});
  }

  deleteBlog(event){
    this.dialogsService.showConfirmDialog('', 'You want to delete Blog', 'Yes','No')
      .subscribe(
        res =>{
          console.log(res);
          if(res){
            this.dataService.deleteBlogById(event)
              .subscribe(
                res =>{
                  console.log(res);
                  if(res) {
                    this.dialogsService.showConfirmDialog('', 'Blog Deleted successfully', '','Ok' )
                      .subscribe(
                        response =>{
                          // if()
                          this.getAllBlog();
                        }
                      )
                    // this.getAllBlog();
                  }
                }
              )
          }
        }
      )
  }

}
