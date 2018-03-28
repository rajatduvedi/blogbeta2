
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DemoComponent } from './blogs/demo/demo.component';
// import { BlogCreateComponent } from './blogs/blog-create/blog-create.component';
// import { BlogListComponent } from './blogs/blog-list/blog-list.component';
// import { BlogViewComponent } from './blogs/blog-view/blog-view.component';
import { HomeComponent } from './home.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { SubCategoryListComponent } from '../blogs/sub-category-list/sub-category-list.component';
import { BlogCategoryListComponent } from '../blogs/blog-category-list/blog-category-list.component';

const routes: Routes = [

{ path: '', component: HomeComponent},
{ path: '', component: HomeHeaderComponent , outlet:"header"},
{ path: 'blog', loadChildren: '../blogs/blog.module#BlogModule' },
{ path: 'topics/:topics/:subTopic', component:SubCategoryListComponent},
{ path: 'topics/:topics', component:BlogCategoryListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HomeRoutingModule {
}
// export const appRoutingComponents = [AppComponent];
