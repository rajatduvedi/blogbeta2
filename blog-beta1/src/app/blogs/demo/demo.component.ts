import { Component, OnInit , Input , ViewChild } from '@angular/core';
import { DataService } from './../../../app-services/data/data-service.service';
import { CapitalizePipe } from './../../../app-services/data/pipe.service';
import { Pipe, PipeTransform } from '@angular/core';
import { CarouselComponent }from './../../common-modules/carousel/carousel.component';

@Component({
  selector: 'demo-carousel',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  @Input() coursesList:any;
  @Input() width: number = 1400;
  @ViewChild('carouselwrapper') elementView;
  childIndex: number = 0;
  amount: number = 0;
  public images: any;
  categories = [];
  public category: any;
  name = 'rajat';
  constructor(private dataService: DataService) {
    this.images = [
      'assets/image1.jpg',
      'assets/image2.jpg',
      'assets/image3.jpg' ,
      'assets/image4.jpg' ,
      'assets/image5.jpg' ,
      'assets/image6.jpg' ,
      'assets/image7.jpg' ,
      'assets/image8.jpg',
      'assets/image9.jpg',
      'assets/image3.jpg' ,
      'assets/image4.jpg' ,
      'assets/image5.jpg' ,
      'assets/image6.jpg' ,
      'assets/image7.jpg' ,
      'assets/image1.jpg',
      'assets/image2.jpg',
      'assets/image8.jpg' ,
      'assets/image9.jpg' ,
      'assets/image5.jpg' ,
      'assets/image6.jpg' ,
      'assets/image7.jpg',
      'assets/image6.jpg' ,
      'assets/image7.jpg' ,
      'assets/image1.jpg',
      'assets/image2.jpg',
      'assets/image3.jpg' ,
      'assets/image4.jpg' ,
      'assets/image8.jpg' ,
      'assets/image9.jpg' ,
      'assets/image6.jpg' ,
      'assets/image7.jpg' ,
      'assets/image1.jpg',
      'assets/image2.jpg',
      'assets/image8.jpg' ,
      'assets/image9.jpg' ,
      'assets/image5.jpg' ,
      'assets/image6.jpg' ,
      'assets/image7.jpg',
      'assets/image6.jpg' ,
      'assets/image7.jpg' ,
      'assets/image6.jpg' ,
      'assets/image7.jpg' ,
      'assets/image1.jpg',
      'assets/image2.jpg',
      'assets/image8.jpg' ,
      'assets/image9.jpg' ,
      'assets/image5.jpg' ,
      'assets/image6.jpg' ,
      'assets/image7.jpg',
      'assets/image6.jpg' ,
      'assets/image7.jpg' ,
    ]
  }

  ngOnInit() {
    this.getAllCategories();
    // console.log()
    // this.
  }


    getAllCategories() {
      this.dataService.getAllCategory()
        .subscribe(
          res => {
            // console.log(res);
            this.categories = res;
            console.log(this.categories);
            // this.category. res;
            // this.categories.splice(0,0,{categorykey:'none',categoryValue:'select as Root Category', _id: '0'});

            // console.log(this.categories)

          },
          error =>{
            console.log(error);
          },
          () =>{

          }
        )
    }

//     transform(value: string, args: string[]): any {
//   if (!value) return value;
//
//   return value.replace(/\w\S*/g, function(txt) {
//       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//   });
// }


}
