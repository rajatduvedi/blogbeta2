import { Component, OnInit , Input , ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() imageList:any;
  @Input() categoryList: any;
  @Input() variable:any;
  @Input() width: number = 1200;
  @ViewChild('carouselwrapper') elementView;
  childIndex: number = 0;
  amount: number = 0;
  imgwidth = 600;
  totalAmount;
  public images: any;
  data: any;
  constructor() {
}

  ngOnInit() {
    // alert(this.imageList. length)
    this.totalAmount = this.imgwidth * (this.imageList.length -2);
    this.data = this.categoryList
    console.log(this.categoryList);
    console.log(this.imageList);
    console.log(this.variable);
  }
  scroll(forward: boolean, elem: any) {
  this.childIndex += forward ? 1 : -1;
  this.amount = -(this.calcScroll(elem));
  console.log(this.amount);
}
calcScroll(elem: any) {

  let counter = 0;
  for (let i = this.childIndex - 1; i >= 0; i--) {
    const el = elem.children[i];
    const style = el.currentStyle || window.getComputedStyle(el);
    counter += el.offsetWidth + (parseFloat(style.marginLeft) + parseFloat(style.marginRight));
  }
  return counter;
}

}
