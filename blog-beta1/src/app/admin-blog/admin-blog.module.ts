import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBlogRoutingModule } from './admin-blog-routing.module';
import { AdminBlogComponent } from './admin-blog.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { DashBoardComponent } from './dashboard/dashboard.component';

import { MatRadioModule, MatButtonModule, MatIconModule, MatFormFieldModule,
  MatInputModule, MatSliderModule, MatSelectModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule,
  MatCheckboxModule, MatDialogModule, MatStepperModule, MatSlideToggleModule, MatCardModule, MatListModule,
  MatChipsModule,MatTooltipModule, MatSidenavModule, MatToolbarModule, MatMenuModule, MatTableModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BlogCreateComponent } from '../blogs/blog-create/blog-create.component';
// import { BlogListComponent } from '../blogs/blog-list/blog-list.component';
// import { BlogViewComponent } from '../blogs/blog-view/blog-view.component';
// import{ BlogModule } from '../blogs/blog.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { BlogTableComponent } from './blog-table/blog-table.component';

// import {FroalaEditorModule} from 'ng2-froala-editor/ng2-froala-editor'; // <-- Import it in your NgModule
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    AdminBlogRoutingModule,
    CKEditorModule,
    MatChipsModule
  ],
  declarations: [AdminBlogComponent, ManageCategoryComponent, DashBoardComponent,BlogTableComponent],
  exports: [AdminBlogComponent],
  entryComponents: []
})
export class AdminBlogModule { }
