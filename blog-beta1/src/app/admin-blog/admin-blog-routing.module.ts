import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { BlogCreateComponent } from '../blogs/blog-create/blog-create.component';
// import { BlogListComponent } from '../blogs/blog-list/blog-list.component';
import { AdminBlogComponent } from './admin-blog.component';
// import { BlogViewComponent } from '../blogs//blog-view/blog-view.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { BlogTableComponent } from './blog-table/blog-table.component';

const routes: Routes = [
  { path: '', component: AdminBlogComponent ,

  children: [

  { path: 'dashboard' , component: DashBoardComponent},
    { path: 'manage-category', component: ManageCategoryComponent ,
    children: [
      { path: 'blog-table', component:BlogTableComponent ,outlet:"table"},
    ]
   },

   { path: 'blog', loadChildren: '../blogs/blog.module#BlogModule'  },

  // {path: 'blog-create' ,component: BlogCreateComponent },


]

},

// {path: 'blog-list' ,component: BlogListComponent , outlet: 'list' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AdminBlogRoutingModule {}
