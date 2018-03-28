import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatRadioModule, MatButtonModule, MatIconModule, MatFormFieldModule,
  MatInputModule, MatSliderModule, MatSelectModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule,
  MatCheckboxModule, MatDialogModule, MatStepperModule, MatSlideToggleModule, MatCardModule, MatListModule,
  MatChipsModule,MatTooltipModule, MatSidenavModule, MatToolbarModule, MatMenuModule, MatTableModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
// import { BlogCreateComponent } from '../blogs/blog-create/blog-create.component';
// import { BlogListComponent } from '../blogs/blog-list/blog-list.component';
// import { BlogViewComponent } from '../blogs/blog-view/blog-view.component';
// import{ BlogModule } from '../blogs/blog.module';
import { HomeComponent } from './home.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { CarouselComponent }from './carousel/carousel.component';
import { SubCategoryListComponent } from '../blogs/sub-category-list/sub-category-list.component';
import { BlogCategoryListComponent } from '../blogs/blog-category-list/blog-category-list.component';
// import {FroalaEditorModule} from 'ng2-froala-editor/ng2-froala-editor'; // <-- Import it in your NgModule
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    // BlogModule,
    MatMenuModule,
    MatTableModule,
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
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatListModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    // FroalaEditorModule,
    // AppMaterialModule,
    MatChipsModule
  ],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [HomeComponent, HomeHeaderComponent, CarouselComponent, BlogCategoryListComponent, SubCategoryListComponent],
  providers: [],
  exports: [],
  entryComponents: []
})
export class HomeModule { }
