import { Component,OnInit } from '@angular/core';
import { DataService } from '../app-services/data/data-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserRegistrationComponent } from './iamModule/user-registration/user-registration.component';
import { CategoryListPopupComponent } from './iamModule/category-list-popup/category-list-popup.component';
// import * as FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min';
import { Router } from '@angular/router';
import { IUser, User } from '././models/user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  counter= 1;
  categoryList = [];
  loaded = false;
  imageList =[];
  user: IUser = new User();
  meuser = false
  constructor(private dataService: DataService, public dialog: MatDialog, private router: Router){


  }
  ngOnInit() {
    this.dataService.getAllCategory()
      .subscribe(
        res =>{
          console.log(res);
          this.categoryList = res;
          this.loaded = true;
        }
      )

      this.getResponsefromLocalStroage('temp');
  }

  openRegPopup() {
    const dialogRef = this.dialog.open(UserRegistrationComponent, {
      width: '60%',
      data: { availableList: "hello", assignedList: [], type: 'signUp', }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.getResponsefromLocalStroage('reg')
      // this.router.navigate(['/']);
      // location.reload()
    });
  }

  openLogInPopup () {
    const dialogRef = this.dialog.open(UserRegistrationComponent, {
      width: '60%',
      data: { availableList: "hello", assignedList: [], type: 'login', }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.getResponsefromLocalStroage('login')
      this.router.navigate(['/']);
      location.reload()
    });
  }
  selectCategory () {
    const dialogRef = this.dialog.open(CategoryListPopupComponent, {
      disableClose: true,
      width: '100%',
      data: { availableList: "hello", assignedList: [], id: this.user, }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.getResponsefromLocalStroage('temp')
    });
  }
  getResponsefromLocalStroage(flag){
    // console.log(this.dataService.getLocalStroageUser())
    this.user = this.dataService.getLocalStroageUser()
    if (this.user) {
      this.meuser = true
      if (flag === 'reg') {
        this.selectCategory();
      }
      // this.router.navigate(['/']);
      // location.reload()
    }
    else {
      this.meuser = false
    }
  }

  newStroy() {
    this.router.navigate(['/blog/blog-create']);
  }

  logOut () {
    localStorage.removeItem('currentuser')
    this.getResponsefromLocalStroage('temp');
    this.router.navigate(['/']);
    // console.log('hello')
    location.reload()

  }
}
