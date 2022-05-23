import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/core/guards/login.guard';
import { AboutComponent } from './blog/about/about.component';
import { BlogAddComponent } from './blog/blog-add/blog-add.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { BlogComponent } from './blog/blog.component';
import { BlogsComponent } from './blog/blogs/blogs.component';
const routes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      { path: 'blogs', component: BlogsComponent },
      { path: 'add', component: BlogAddComponent, canActivate: [LoginGuard] },
      { path: 'detail/:id', component: BlogDetailComponent },
      { path: 'about', component: AboutComponent },
      { path: 'edit/:id', component: BlogEditComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
