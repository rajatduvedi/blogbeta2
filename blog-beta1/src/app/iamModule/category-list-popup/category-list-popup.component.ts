import { Component, OnInit,Inject, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../app-services/data/data-service.service';
import { ICategory, Category, IBlog, Blog} from '../../models/blog.model';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-category-list-popup',
  templateUrl: './category-list-popup.component.html',
  styleUrls: ['./category-list-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryListPopupComponent implements OnInit {
  categoryList= [];
  selectCategoryList= []
  constructor(private dataService: DataService,
     private router: Router,
     public dialogRef: MatDialogRef<CategoryListPopupComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any
   ) { }

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

  selectCategory(cat, subcat){
    console.log(cat,subcat)
    console.log("cat,subcat")
    if (this.selectCategoryList.indexOf(subcat) > -1) {
      this.selectCategoryList.splice(this.selectCategoryList.indexOf(subcat),1)
      console.log(this.selectCategoryList)
    }
    else {
      this.selectCategoryList.push(subcat)
      console.log(this.selectCategoryList)
    }
  }
  saveIntCategory () {
    console.log(this.data)
    if(this.selectCategoryList.length > 0) {
      this.dataService.updateUser({ids:this.selectCategoryList,id: this.data.id._id, register_type: 'mail'})
        .subscribe(
          res =>{
            if (res) {
              this.setuser(res)
            }
          }
        )
    }
  }

  setuser (data) {
    localStorage.setItem('currentuser',JSON.stringify(data))
    this.dialogRef.close();
  }

}
