import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IBlog, Blog, IComment, Comment, ILikes, Likes} from '../../models/blog.model';
import { DataService } from './../../../app-services/data/data-service.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IUser, User } from '../../models/user.model';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlogViewComponent implements OnInit {
  blogId : string;
  blogModel: IBlog = new Blog();
  comment = '';
  emogiHtml = '';
  commentArray = [];
  commentIndex ;
  reply = '';
  imageUrl = '';
  name = '';
  toolTip;
  noOfComments;
  user: IUser = new User();
  meuser = false
  replybox = false;

  emogiCollection = ['mood','mood_bad','sentiment_dissatisfied','sentiment_neutral','sentiment_very_dissatisfied']
  commentsLoadMsg = 'load All comments';
  commentBox: boolean = false;
  headerTitle: boolean = false;
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('hsgdff')
     this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.blogId = params['blogId'];
      this.getResponsefromLocalStroage()
      this.dataService.getBlogById(this.blogId)
        .subscribe(
          res => {
            // console.log(res);
            this.blogModel = res;
            console.log(this.blogModel)
            this.imageUrl = this.blogModel.author.imageUrl;
            this.name = this.blogModel.author.name
             var template = document.createElement('template');
             template.innerHTML = this.blogModel.blogContent;
             console.log(template.innerHTML)
            this.noOfComments = this.blogModel.comments.length;
            this.toolTip = '<div *ngFor="let like of this.blogModel.likes"> {{like}}</div>'
            // this.blogModel.blogCreationDate
          },
          error => {

          },
          () => {

          }
        )

    }, err => {
      console.log(err);
    }, () => {
    });
  }

  goToPrevious() {
    this.router.navigate(['blog-list']);
  }

  goToCommentBox() {
    this.commentBox = true;
    // this.headerTitle = true;
  }

  changeCommentHtml() {

    this.headerTitle = true // user name
  }

  cancelComment() {
    this.headerTitle = false;
  }
  postComment(){
    // console.log(this.comment);
      // console.log(this.blogModel);
    const tempComment: IComment =  new Comment();
    tempComment.message = this.comment;
    tempComment.timePosted = new Date();
    tempComment.replies = [];
    tempComment.user = this.user._id;
    this.blogModel.comments.splice(0, 0, tempComment);
    // console.log(this.blogModel);
    this.dataService.createBlog(this.blogModel)
      .subscribe(
        res =>{
          console.log(res);
          this.blogModel = res;
        },
        error =>{
          console.log(error);
        },
        () =>{

        }
      )
      this.noOfComments = this.blogModel.comments.length;
    this.comment = '';
  }

  showAllComment() {
    this.commentsLoadMsg = '<h1> Comments </h1>';
    if(this.blogModel.comments.length >0) {
      // alert("helloo")
      this.commentArray = this.blogModel.comments;
      // this.noOfComments= this.commentArray.le
    }
  }

  selectEmogi(emogi){
    console.log(emogi);
    // this.emogiHtml = this.comment + "<mat-icon>mood_bad</mat-icon>" ;
    // this.comment = this.comment + "'<mat-icon>' + emogi + '</mat-icon>'";
  }

  likeBlog(){
    const cond = this.blogModel.likes.some(like => {
      return like.userId === '1'
    });
    console.log(cond);
    if(!cond) {
    const userLike: ILikes = new Likes();
    userLike.likeDislike = 1;
    userLike.userId = '1'
    console.log(userLike);
    this.blogModel.likes.push(userLike);
    this.blogModel.totalLikes++ ;
    this.dataService.createBlog(this.blogModel).subscribe(res => {
      this.blogModel = res;
      console.log(this.blogModel);
      // this.totalLikes++;
    },err => {
      // this.anyErrors = true;
    },() => {
      // this.finished = true;
    });
  } else {
    // this.blogModel.likes.userId = '1'
    const userLike = this.blogModel.likes.find(like => {
      return like.userId === '1'
    });
    let index = this.blogModel.likes.indexOf(userLike);
    console.log(index);
    this.blogModel.likes.splice(index, 1);
    this.blogModel.totalLikes-- ;
    console.log(this.blogModel.likes);
    this.dataService.createBlog(this.blogModel).subscribe(res => {
      this.blogModel = res;
      console.log(this.blogModel);
      // this.totalLikes++;
    },err => {
      // this.anyErrors = true;
    },() => {
      // this.finished = true;
    });

  }
}

  PostReply(commentIndex) {
    this.replybox = true;
    this.commentIndex = commentIndex;
  }

  LikeComment(index) {
    const cond = this.blogModel.comments[index].likes.some(like => {
      return like.userId === '1'
    });
    console.log(cond);
    if(!cond) {
    const userLike: ILikes = new Likes();
    userLike.likeDislike = 1;
    userLike.userId = '1'
    console.log(userLike);
    this.blogModel.comments[index].likes.push(userLike);
    this.blogModel.comments[index].totalLikes++ ;
    this.dataService.createBlog(this.blogModel).subscribe(res => {
      this.blogModel = res;
      console.log(this.blogModel);
      // this.totalLikes++;
    },err => {
      // this.anyErrors = true;
    },() => {
      // this.finished = true;
    });
  } else {
    // this.blogModel.likes.userId = '1'
    const userLike = this.blogModel.comments[index].likes.find(like => {
      return like.userId === '1'
    });
    let contIndex = this.blogModel.comments[index].likes.indexOf(userLike);
    console.log(index);
    this.blogModel.comments[index].likes.splice(contIndex, 1);
    this.blogModel.comments[index].totalLikes-- ;
    console.log(this.blogModel.comments[index].likes);
    this.dataService.createBlog(this.blogModel).subscribe(res => {
      this.blogModel = res;
      console.log(this.blogModel);
      // this.totalLikes++;
    },err => {
      // this.anyErrors = true;
    },() => {
      // this.finished = true;
    });

  }
  }

  addReply(index) {
    const tempreply: IComment =  new Comment();
    tempreply.message = this.reply;
    tempreply.timePosted = new Date();
    tempreply.user = this.user._id;
    tempreply.replies = [];
    this.blogModel.comments[index].replies.splice(0, 0, tempreply);
    // console.log(this.blogModel.comments[index]);
    this.dataService.createBlog(this.blogModel)
      .subscribe(
        res =>{
          console.log(res);
        },
        error =>{
          console.log(error);
        },
        () =>{

        }
      )
    this.reply = '';
  }



  LikeReply(commentIndex, index) {
    console.log(commentIndex);
    console.log(index);
  }
  getResponsefromLocalStroage(){
    // console.log(this.dataService.getLocalStroageUser())
    this.user = this.dataService.getLocalStroageUser()
    if (this.user) {
      this.meuser = true
    }
    else {
      this.meuser = false
    }
  }

}
