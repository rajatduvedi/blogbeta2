import { Component,OnInit } from '@angular/core';
import { DataService } from '../app-services/data/data-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserRegistrationComponent } from './iamModule/user-registration/user-registration.component';
import { CategoryListPopupComponent } from './iamModule/category-list-popup/category-list-popup.component';
// import * as FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min';
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
  user = {};
  meuser = false
  constructor(private dataService: DataService, public dialog: MatDialog){


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

      this.getResponsefromLocalStroage();
  }

  openRegPopup() {
    const dialogRef = this.dialog.open(UserRegistrationComponent, {
      disableClose: true,
      width: '60%',
      data: { availableList: "hello", assignedList: [], type: 'signUp', }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.selectCategory();
      this.getResponsefromLocalStroage()
    });
  }

  openLogInPopup () {
    const dialogRef = this.dialog.open(UserRegistrationComponent, {
      disableClose: true,
      width: '60%',
      data: { availableList: "hello", assignedList: [], type: 'login', }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.getResponsefromLocalStroage()
      this.selectCategory();
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
      this.getResponsefromLocalStroage()
    });
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

  logOut () {
    localStorage.removeItem('currentuser')
    this.getResponsefromLocalStroage();

  }
}
