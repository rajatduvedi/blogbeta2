// import { BlogComponent } from './../blog/blog.component';
// import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  tooltipPosition = 'above';
  show = false;
  showFiller = false;
  constructor() { }

  ngOnInit() {
    // alert("admin")
  }

  showSideMenu(data){
    if(data === 'Blogs'){
      this.show = true;
    }
    else{
        this.show = false;
    }
  }
  // manageBlog(){
  //   this.showmanage = true;
  // }

}
