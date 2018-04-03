import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DataService } from '../../../app-services/data/data-service.service'
import { CapitalizePipe } from '../../../app-services/data/pipe.service';
import { ICategory, Category, IBlog, Blog} from '../../models/blog.model';
import { Router } from '@angular/router';
import {MatChipInputEvent} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
const COMMA = 188;

@Component({
  selector: 'app-manage-category-blog',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit, OnDestroy {
    createBlogCategoryFormGroup: FormGroup;
    visible: boolean = true;
    selectable: boolean = true;
    category:  ICategory = new Category();

    categories = [];
    removable: boolean = true;
    addOnBlur: boolean = true;
    selectedCategoryValue ;
    separatorKeysCodes = [ENTER, COMMA];
    subCategory = [];
    blogModel= [];
      displayedColumns = ['blogId', 'category','subCategory','blogTitle', 'blogimageUrl', 'edit','view','delete'];
//     displayedColumns:[
//         'userId',
//         'authorId',
//         'authorName',
//         'blogTitle'
// ];
    // exampleDatabase = new ExampleDatabase();
  //  dataSource : ExampleDataSource;
    createCategory:boolean = false;
    createBlogCategory: boolean = false;
    subCategories = [];
    actions = [
      'CreateCategory',
      'ManageCategory'

    ];
    // manageCategory: boolean = false

  constructor(private _formBuilder: FormBuilder ,private router: Router, private dataService: DataService) { }

  ngOnInit() {
    console.log(this.displayedColumns);
    this.createBlogCategoryFormGroup = this._formBuilder.group({
      blogCategoryDisplayedvalue: ['', Validators.required],
      blogCategoryKey: ['', Validators.required],
      blogSubCategory: this._formBuilder.array([]),
      blogCategoryId: ['',Validators.required],
      // blogSubCategory: ['', Validators.required],
    });
    this.getAllCategories();
  }

  getAllCategories() {
    this.dataService.getAllCategory()
      .subscribe(
        res => {
          console.log(res);
          this.categories = res;
          // this.category. res;
          this.categories.splice(0,0,{categorykey:'none',categoryValue:'select as Root Category', _id: '0'});

          // console.log(this.categories)

        },
        error =>{
          console.log(error);
        },
        () =>{

        }
      )
  }

    add(event: MatChipInputEvent): void {
      let input = event.input;
      let value = event.value;
      if ((value || '').trim()) {
        this.subCategory.push({ name: value.trim() });
        // (<FormArray>this.CourseMetaDataFormGroup.get('courseGoals')).push(control);
        // const control = new FormControl({ name: value.trim() }, Validators.required);
        //  (<FormArray>this.createBlogCategoryFormGroup.get('blogSubCategory')).push(control);
      }
      if (input) {
        input.value = '';
      }
   }

   remove(tag: any): void {
      let index = this.subCategory.indexOf(tag);
      if (index >= 0) {
        this.subCategory.splice(index, 1);
      }
   }

   createCategoryContainer() {
      this.createCategory = true;
   }

   submit() {
      this.category.categorykey = this.createBlogCategoryFormGroup.value.blogCategoryKey;
      this.category.categoryValue = this.createBlogCategoryFormGroup.value.blogCategoryDisplayedvalue;
      this.category.parentCategoryId = this.createBlogCategoryFormGroup.value.blogCategoryId;
      console.log(this.category);
      this.dataService.createBlogCategory(this.category)
        .subscribe(
          res => {
            console.log(res);
          },
          error => {
            console.log(error);
          },
          () => {

          }
        );
   }

   createCategoryBlogContainer() {
     this.createBlogCategory = true;
    //  this.router.navigate(['admin/manage-category' , {outlets: {list: 'blog/blog-list'}}]);
     this.router.navigate(['admin/manage-category' , {outlets: {table: 'blog-table'}}]);
    //  this.dataService.getAllBlogService()
    //    .subscribe(
    //      res => {
    //        console.log(res);
    //       this.blogModel = res;
     //
    //       //  this.blogModel = res;
    //       this.dataSource = new ExampleDataSource(this.blogModel);
    //       // console.log(this.dataSource.data);
    //      },
    //      error => {
    //        console.log(error);
    //      },
    //      () => {
     //
    //      }
    //    );

   }
  disconnect() {}

   cancelCategoryContainer() {
     this.createCategory = false;
   }

   refresh() {
     this.ngOnDestroy();
   }

   ngOnDestroy() {
     localStorage.setItem(name,'hhh');
     alert("hiii")
   }

   selectedCategory(event) {
     // alert("hello")
     console.log(event.value)
     this.selectedCategoryValue = event.value;
     if(event.value) {
       for(var i=0; i< this.categories.length; i++){
          if(this.categories[i].categorykey == event.value){
            console.log(this.categories[i]);
            this.subCategories = this.categories[i].subCategory;
            console.log(this.subCategories);
           //  break;
          }
       }
       // console.log(this.categories.indexOf(event.value))
     }
   }

   selectedsubCategory(event) {
     console.log("hello")
     alert("subcategory")
     console.log(event.value)
     if(event.value) {
      //  for(var i=0; i< this.subCategories.length; i++){
      //     if(this.categories[i].categorykey == event.value){
      //       console.log(this.categories[i]);
      //       this.subCategories = this.categories[i].subCategory;
      //       console.log(this.subCategories);
      //      //  break;
      //     }
      //  }
      // this.dataService.getBlogBysubcategory(this.selectedCategoryValue,event.value)
      //   .subscribe(
      //      res =>{
      //        console.log(res);
      //   })
     }
   }

}



 // export class d extends ManageCategoryComponent{
 //    const blogModel: IBlog = ManageCategoryComponent.blogModel
 // }



// export class ExampleDataSource extends DataSource<any> {
//   constructor(private data: IBlog[]) {
//     super();
//   }
//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<IBlog[]> {
//
//     return Observable.of(this.data);
//   }
//
//   disconnect() {}
// }
