import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
// import { AdminBlogComponent } from './admin-blog/admin-blog.component';
// import { ManageCategoryComponent } from './admin-blog/manage-category/manage-category.component';
import { DemoComponent } from './demo/demo.component';
import { MatRadioModule, MatButtonModule, MatIconModule, MatFormFieldModule,
  MatInputModule, MatSliderModule, MatSelectModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule,
  MatCheckboxModule, MatDialogModule, MatStepperModule, MatSlideToggleModule, MatCardModule, MatListModule,
  MatChipsModule,MatTooltipModule, MatSidenavModule, MatToolbarModule, MatMenuModule, MatTableModule,
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { CategoryListComponent } from './category-list/category-list.component';
// import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';

// import { CarouselComponent }from './../common-modules/carousel/carousel.component';

// import {FroalaEditorModule} from 'ng2-froala-editor/ng2-froala-editor'; // <-- Import it in your NgModule
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
     MatMenuModule, MatTableModule,
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
    BlogRoutingModule,
    CKEditorModule,
    MatChipsModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ],
  declarations: [ DemoComponent, BlogCreateComponent, BlogListComponent, BlogViewComponent, CategoryListComponent],
  exports: [ DemoComponent, BlogCreateComponent, BlogListComponent, BlogViewComponent],
  entryComponents: [DemoComponent]
})
export class BlogModule { }
