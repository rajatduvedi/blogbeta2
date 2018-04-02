import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../app-services/data/data-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SubCategoryListComponent } from '../blogs/sub-category-list/sub-category-list.component';
// import { CarouselComponent }from '.././common-modules/carousel/carousel.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  imageList =[];
  blogList = [];
    user = null;
    meuser = false;
    intrestedCategory = []

  constructor(private dataService: DataService, private router: Router) {
    this.imageList = [
      'assets/image1.jpg',
      'assets/image2.jpg',
      'assets/image3.jpg',
      'assets/image4.jpg',
      'assets/image5.jpg',
      'assets/image6.jpg',
      'assets/image7.jpg',
      'assets/image8.jpg',
      'assets/image9.jpg',
      'assets/rama.jpg',
    ]
  }

  ngOnInit() {
    this.getResponsefromLocalStroage();
  }



  gotoBlogView(data) {
    // [routerLink]="['/'+this.urlstr[1]+'/blog-view']"
    console.log(data);
    this.router.navigate(['/blog/blog-view'], {queryParams: { blogId: data } });

  }

  getResponsefromLocalStroage(){
    console.log('hasgdhahasan raxa')
    // console.log(this.dataService.getLocalStroageUser())
    this.user = this.dataService.getLocalStroageUser()
    if (this.user) {
      if (this.user.intrestedCategory.length > 0) {
        this.meuser = true
        this.intrestedCategory = this.removeDuplicateUsingFilter(this.user.intrestedCategory)
        // this.intrestedCategory = this.user.intrestedCategory
        console.log(this.intrestedCategory)
        // for (var i = 0 ; i<this.user.intrestedCategory.length;i++) {
        //   this.setIntrestedCategory(this.user.intrestedCategory[i])
        // }
      }
    }
    else {
      this.meuser = false
    }
  }
   removeDuplicateUsingFilter(arr){
      let unique_array = arr.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
      });
      return unique_array
  }
  setIntrestedCategory (id) {
    console.log(id)
    this.dataService.getBlogByintrestedcategory(id)
    .subscribe(
      res =>{
        console.log(res)
         if (res) {
           var obj = {
             category: id,
             blogs: res
           }
           this.intrestedCategory.push(obj)
         }
        // this.registerDone(res)

      },
      error =>{
        console.log(error);
      },
      () =>{
        console.log(this.intrestedCategory)
      }
    )
  }

  gotToBlockListBySubcategory(cat, subcat){
    this.router.navigate(['/topics',cat, subcat]);
  }

}
