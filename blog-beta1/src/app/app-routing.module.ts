import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './iamModule/user-registration/user-registration.component';
import { HomeComponent } from './home/home.component';
import { ResponsePageComponent } from './iamModule/response-page/response-page.component';

const routes: Routes = [
{ path: 'admin', loadChildren: './admin-blog/admin-blog.module#AdminBlogModule' },
// { path: 'blog', loadChildren: './blogs/blog.module#BlogModule' },
{ path: '', loadChildren: './home/home.module#HomeModule' },
{ path: 'register', component: UserRegistrationComponent},
{ path: 'response', component: ResponsePageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {
    enableTracing: true
  }
  )],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
// export const appRoutingComponents = [AppComponent];
