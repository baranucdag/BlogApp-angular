import { BlogComponent } from './blog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { AboutComponent } from './about/about.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { LoginGuard } from 'src/app/core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      { path: '', component: BlogsComponent },
      { path: 'add', component: BlogAddComponent, canActivate: [LoginGuard] },
      { path: 'detail/:id', component: BlogDetailComponent },
       { path: 'about', component: AboutComponent },
      { path: 'edit/:id', component: BlogEditComponent },
     ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
