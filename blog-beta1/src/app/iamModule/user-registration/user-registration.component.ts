import { Component, OnInit,Inject, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { IUser, User,} from '../../models/user.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../../app-services/data/data-service.service';
declare const gapi: any;
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserRegistrationComponent implements OnInit {
  userRegistrationFormGroup: FormGroup;
  public auth2: any;
  titleNote = 'hola';
  contentNote = '';
  boxPanel = false;
  userDetail: IUser = new User()
  private scope = [
   'profile',
   'email',
   'https://www.googleapis.com/auth/plus.me',
   'https://www.googleapis.com/auth/contacts.readonly',
   'https://www.googleapis.com/auth/admin.directory.user.readonly'
 ].join(' ');
  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private dataService: DataService,
    private router: Router,
    public dialogRef: MatDialogRef<UserRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

   }

  ngOnInit() {
    this.googleInit()
    console.log(this.data)
    this.changeHtml()

    // this.userRegistrationFormGroup = this.formBuilder.group({
    //   userId: ['', Validators.required],
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   email: ['', Validators.required],
    //   password: ['', Validators.required],
    //   roles: [['normalUser']]
    // });
  }
  changeHtml () {
    if (this.data.type === 'login') {
      this.titleNote = 'Welcome';
      this.contentNote = 'log in into your account'
    }
    if (this.data.type === 'signUp') {
      this.titleNote = 'Join Us';
      this.contentNote = '  Create an account to personalize your homepage, follow your favorite authors and publications, applaud stories you love, and more.'
    }
  }
  public googleInit() {
  gapi.load('auth2', () => {
    this.auth2 = gapi.auth2.init({
      client_id: '70917122304-celg3dloso9j55o23ji3sh0r5daote3f.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: this.scope,
    });
    this.attachSignin(document.getElementById('googleBtn'));
  });
}

public attachSignin(element) {
  this.auth2.attachClickHandler(element, {},
    (googleUser) => {



      let profile = googleUser.getBasicProfile();
      console.log('Token || ' + googleUser.getAuthResponse().id_token);
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
      //YOUR CODE HERE
      this.userDetail.token =  googleUser.getAuthResponse().id_token;
      this.userDetail.identificationId = profile.getId();
      this.userDetail.name = profile.getName();
      this.userDetail.imageUrl =  profile.getImageUrl();
      this.userDetail.email = profile.getEmail();
      this.userDetail.register_type = 'mail';

      if(this.userDetail){
        this.boxPanel =  true;
        if(this.data.type === 'login') {
          this.loginApi()
        }
        if(this.data.type === 'signUp') {
          this.registerApi()
        }
      }
      // console.log(this.userDetail);
      this.saveDetails();

      // this.router.navigate(['response']);
      // location.reload()

    }, (error) => {
      // alert(JSON.stringify(error, undefined, 2));
    });
  }
  registerApi () {
    this.dataService.registerUser(this.userDetail)
      .subscribe(
        res =>{
          // console.log(res)
          this.registerDone(res)

        },
        error =>{
          console.log(error);
        },
        () =>{

        }
      )
  }
  loginApi () {
    this.dataService.loginUser(this.userDetail)
      .subscribe(
        res =>{
          console.log(res)
          this.registerDone(res)
          // this.router.navigate(['/blog/topics'])
        },
        error =>{
          console.log(error);
        },
        () =>{

        }
      )
  }

  registerDone (data) {
    console.log(data)
    localStorage.setItem('currentuser',JSON.stringify(data))
    this.dialogRef.close();
  }

  saveDetails(){

    // localStorage.setItem('currentuser',JSON.stringify(this.userDetail))

    this.dialogRef.close();
  }
  cancel () {
    this.dialogRef.close();
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
