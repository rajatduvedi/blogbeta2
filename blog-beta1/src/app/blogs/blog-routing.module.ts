import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { DemoComponent } from './demo/demo.component';
import { CategoryListComponent } from './category-list/category-list.component';
// import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';
// import { BlogTableComponent } from './blog-table/blog-table.component';

// import { ManageCategoryComponent } from './admin-blog/manage-category/manage-category.component';

const routes: Routes = [

  { path: 'blog-create', component: BlogCreateComponent},
  { path: 'blog-list', component: BlogListComponent},
  { path: 'blog-view', component:BlogViewComponent},
  { path: 'topics', component:CategoryListComponent},
  // { path: 'topics/:topics/:subTopic', component:SubCategoryListComponent},
  // { path: 'blog-table', component:BlogTableComponent },
  { path: '', component: DemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BlogRoutingModule {}
