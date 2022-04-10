import { BlogEditComponent } from './components/blog/blog-edit/blog-edit.component';
import { BlogsComponent } from './components/blog/blogs/blogs.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { AboutComponent } from './components/blog/about/about.component';
import { LoginGuard } from './guards/login.guard';
import { BlogAddComponent } from './components/blog/blog-add/blog-add.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'blog/blogs' },
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      { path: 'blogs', component: BlogsComponent },
      { path: 'add', component: BlogAddComponent, canActivate: [LoginGuard] },
      { path: ':id/detail', component: BlogDetailComponent },
      { path: 'about', component: AboutComponent },
      { path: 'edit', component: BlogEditComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
