import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatRadioModule, MatButtonModule, MatIconModule, MatFormFieldModule,
  MatInputModule, MatSliderModule, MatSelectModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule,
  MatCheckboxModule, MatDialogModule, MatStepperModule, MatSlideToggleModule, MatCardModule, MatListModule, MatToolbarModule,
  MatChipsModule,MatProgressSpinnerModule,MatMenuModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
// import { DemoComponent } from './demo/demo.component';
import { CarouselComponent }from '././common-modules/carousel/carousel.component';
import { DataService } from '../app-services/data/data-service.service';
import { AppConfigService } from '../app-services/core/app.contants.service';
import { DialogsService } from '../app-services/service/dialog/dialog.service';
import { CapitalizePipe } from '../app-services/data/pipe.service';
// import { BlogCreateComponent } from './blogs/blog-create/blog-create.component';
// import { BlogListComponent } from './blogs/blog-list/blog-list.component';
import { BlogModule } from './blogs/blog.module';
import {ConfirmDialogComponent} from '../app-services/service/dialog/confirm-dialog.component';
import { UserRegistrationComponent } from './iamModule/user-registration/user-registration.component';
import { UserLoginComponent } from './iamModule/user-login/user-login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponsePageComponent } from './iamModule/response-page/response-page.component';
import { CategoryListPopupComponent } from './iamModule/category-list-popup/category-list-popup.component';
// import { HomeComponent } from './home/home.component';
// import { DemoComponent } from './blogs/demo/demo.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
@NgModule({
  declarations: [
    AppComponent,
    // DemoComponent,
    CapitalizePipe,
    ConfirmDialogComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    ResponsePageComponent,
    CategoryListPopupComponent
    // HomeComponent,
    // DemoComponent,
    // BlogCreateComponent,
    // BlogListComponent,
    // BlogViewComponent
  ],
  imports: [
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatStepperModule,
    MatSliderModule,
    MatSelectModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    HttpModule,
    FormsModule, ReactiveFormsModule

    // BlogModule

  ],
  exports:[],
  entryComponents: [ConfirmDialogComponent, UserRegistrationComponent, CategoryListPopupComponent],
  providers: [CarouselComponent, DataService, AppConfigService, DialogsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
