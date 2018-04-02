import { Component, OnInit,ViewChild, ViewEncapsulation } from '@angular/core';
import { IBlog, Blog } from '../../models/blog.model'
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material';
import {ENTER} from '@angular/cdk/keycodes';
import { DataService } from './../../../app-services/data/data-service.service';
import { DialogsService } from './../../../app-services/service/dialog/dialog.service';
import { AppConfigService } from './../../../app-services/core/app.contants.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IUser, User } from '../../models/user.model';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
// import AutoformatPlugin from '@ckeditor/ckeditor5-autoformat/src/autoformat';
// import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import BlockquotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote';
// import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';
// import ImagePlugin from '@ckeditor/ckeditor5-image/src/image';
// import ImagecaptionPlugin from '@ckeditor/ckeditor5-image/src/imagecaption';
// import ImagestylePlugin from '@ckeditor/ckeditor5-image/src/imagestyle';
// import ImagetoolbarPlugin from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
// import ListPlugin from '@ckeditor/ckeditor5-list/src/list';
// import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph'
// import CKFinderUploadAdapter from '../../src/uploadadapter'
const COMMA = 188;
// import {FroalaEditorModule} from 'ng2-froala-editor/ng2-froala-editor';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
  // directives: 'MediumContentEditor',

  encapsulation: ViewEncapsulation.None,

})
export class BlogCreateComponent implements OnInit {
  @ViewChild('blogImage') imageplayer: any;
  blogModel: IBlog = new Blog();
  createBlogFormGroup: FormGroup;
  tags = [];
  category = [];
  categories = [];
  imageUploaded =  false;
  baseUrl = '';
  anyErrors = false;
  finished = false;
  subCategories = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  imageCtrl = '';
  currentBlogId;
  separatorKeysCodes = [ENTER, COMMA];
  imagePath;
  user: IUser = new User();
  meuser = false;
  constructor(private _formBuilder: FormBuilder,
     private dataService: DataService,
     private fileService: AppConfigService,
     private activatedRoute: ActivatedRoute,
     private router: Router,
     private dialogsService:DialogsService) {
      }

  ngOnInit() {
    console.log(this.blogModel);
    this.getResponsefromLocalStroage()
    this.activatedRoute.queryParams.subscribe((params: Params) => {
       this.currentBlogId = params['blogId'];
       this.getcurrentBlogById(this.currentBlogId);
     }, err => {
       console.log(err);
     }, () => {
   });
    this.createBlogFormGroup = this._formBuilder.group({

      blogTitle: ['', Validators.required],
      category: ['',Validators.required],
      subCategory: [''],
      tags:[''],
      excerptText: [''],
      readingTime: [''],
      author: [''],
      authorName: [''],
      authorImage: [''],
      blogContent: ['', Validators.required],
      totalLikes: ['1'],
      blogimageUrl:['']
    });
    this.getAllCategories();
    console.log(this.createBlogFormGroup);
    console.log(typeof this.createBlogFormGroup);
    var form = new FormData();
    console.log(form);
    console.log(typeof form);
    this.baseUrl = this.fileService.getBaseFileServerUrl();
    // ClassicEditor
    // 	.create( document.querySelector( '#editor' ), {
    // 		plugins: [
    // 		],
    // 		toolbar: [ 'heading', '|', 'undo', 'redo', 'bold', 'italic', 'bulletedList', 'numberedList', 'imageUpload' ],
    // 		ckfinder: {
    // 			// eslint-disable-next-line max-len
    // 			uploadUrl: 'https://cksource.com/weuy2g4ryt278ywiue/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
    // 		}
    // 	} )
    // 	.then( editor => {
    // 		// window.editor = editor;
    // 	} )
    // 	.catch( err => {
    // 		console.error( err.stack );
    // 	} );

  }

  getcurrentBlogById(id){
    this.dataService.getBlogById(id)
      .subscribe(
        res => {
          console.log(res);
          this.populateBlogCreateFromObject(res);
        }
      )
  }

  add(event: MatChipInputEvent, stmt): void {
    let input = event.input;
    let value = event.value;
    // console.log(event);
    // console.log(stmt);

    // Add our person
    if ((value || '').trim()) {
      if(stmt === 'tags') {
        this.tags.push({ name: value.trim() });
     }
    //  if(stmt === 'category') {
    //    this.category.push({ name: value.trim() });
    // }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
 }

  remove(tag: any , stmt): void {
    if(stmt === 'tags'){
      let index = this.tags.indexOf(tag);
      if (index >= 0) {
        this.tags.splice(index, 1);
      }
  }
  //  if(stmt === 'category'){
  //    let index = this.category.indexOf(tag);
  //    if (index >= 0) {
  //      this.category.splice(index, 1);
  //    }
  //  }
  }

  uploadBlogImage() {
    const fileBrowser = this.imageplayer.nativeElement;
    const fileCount = fileBrowser.files.length;
    console.log(fileBrowser.files[0]);
    const formData = new FormData();
    if (fileCount > 0) {
      formData.append('blogImage', fileBrowser.files[0]);
      this.dataService.uploadBlogImage(formData)
        .subscribe(
        res => {
          console.log(res);
          // this.createBlogFormGroup.value
          console.log(this.baseUrl);
          this.createBlogFormGroup.value.blogimageUrl = 'http://' +this.baseUrl + '/' + res.path;
          console.log(this.createBlogFormGroup.value.blogimageUrl);
          this.imageUploaded = true;
          this.imagePath = this.createBlogFormGroup.value.blogimageUrl;
        },
        error => {
          console.log(error);
          this.anyErrors = true;
        },
        () => {
          this.finished = true;
        });
    }
  }

  submit() {
    const form = new FormData();
    console.log(form);
    console.log(this.tags);
    console.log(this.createBlogFormGroup.value);
    this.createBlogFormGroup.value.readingTime = this.calculationReadTime() + 'min'
    this.createBlogFormGroup.value.blogimageUrl = this.imagePath;
    this.createBlogFormGroup.value.author = this.user._id;
    this.createBlogFormGroup.value.tags = this.tags;
    console.log(this.createBlogFormGroup.value);
    this.blogModel = <IBlog>this.createBlogFormGroup.value;
    if(!this.currentBlogId){
      this.blogModel._id = null
    }
    this.dataService.createBlog(this.blogModel)
      .subscribe(
        res =>{
          if(res){
            this.dialogsService.showConfirmDialog('', 'Blog created successfully', '','Ok' )
              .subscribe(
                response =>{
                  // if()
                }
              )
          }
          console.log(res);
        },
        error =>{
          console.log(error);
        },
        () =>{

        }
      )
  }

  calculationReadTime() {
    console.log(this.createBlogFormGroup.value.blogContent)
    var myCode = this.createBlogFormGroup.value.blogContent
    var t = myCode.replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm,"").replace('&nbsp;','');
    console.log(t);
    console.log(t.trim().length);
    var readingTime = ( t.trim().length ) / 275;
    readingTime = Math.round(readingTime);
    return readingTime

  }

  // valuechange(value) {
  //   console.log(value);
  //   if(value.length>=3) {
  //     alert("hello");
  //   }
  // }

  method() {

  }
  getAllCategories() {
    this.dataService.getAllCategory()
      .subscribe(
        res => {
          console.log(res);
          this.categories = res;
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
  selectedCategory(event) {
    // alert("hello")
    console.log(event.value)
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

  changeImageListener($event): void {             // image
    this.readThisImage($event.target);
  }

  readThisImage(inputValue: any): void {           // image
    const file: File = inputValue.files[0];
    console.log(file);
    const myReader: FileReader = new FileReader();
    if (file !== undefined) {
      this.imageCtrl = 'data:' + file.type + ';base64,'; // file name
      myReader.onloadend = this._handleReaderImageLoaded.bind(this);
      myReader.readAsBinaryString(file);
    }
  }
  _handleReaderImageLoaded(readerEvt) { // image
    const binaryString = readerEvt.target.result;
    // console.log()
    this.imageCtrl = this.imageCtrl + btoa(binaryString);
  }

  populateBlogCreateFromObject(blogData){
    console.log(blogData);
    this.blogModel = blogData;
    this.createBlogFormGroup.patchValue({ blogTitle: blogData.blogTitle });
    this.createBlogFormGroup.patchValue({ excerptText: blogData.excerptText });
    this.createBlogFormGroup.patchValue({ blogContent: blogData.blogContent });
    this.createBlogFormGroup.patchValue({ imageUrl: blogData.imageUrl });
    this.createBlogFormGroup.patchValue({ category: blogData.category });
    this.createBlogFormGroup.patchValue({ subCategory: blogData.subCategory });
    this.createBlogFormGroup.patchValue({ tags: blogData.tags });
    this.createBlogFormGroup.patchValue({ blogimageUrl: blogData.blogimageUrl });
    this.createBlogFormGroup.patchValue({ _id: blogData._id });
    // this.imageCtrl = blogData.blogimageUrl
    this.imageCtrl = this.createBlogFormGroup.value.blogimageUrl;
  }

  getResponsefromLocalStroage(){
    // console.log(this.dataService.getLocalStroageUser())
    this.user = this.dataService.getLocalStroageUser()
    if (this.user) {
      console.log('hhh')
      this.meuser = true
      // this.createBlogFormGroup.value.authorId = '1'
      // console.log(this.createBlogFormGroup.value)
    }
    else {
      this.meuser = false
    }
  }

  click(){
    console.log(this.calculationReadTime())
    console.log(this.createBlogFormGroup.value)
  }




}
