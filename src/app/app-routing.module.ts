import { BlogEditComponent } from './components/blog/blog-edit/blog-edit.component';
import { BlogsComponent } from './components/blog/blogs/blogs.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { AboutComponent } from './components/blog/about/about.component';
import { LoginGuard } from './core/guards/login.guard';
import { BlogAddComponent } from './components/blog/blog-add/blog-add.component';
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
      { path: 'detail/:id', component: BlogDetailComponent },
      { path: 'about', component: AboutComponent },
      { path: 'edit/:id', component: BlogEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/*{ path: '', pathMatch: 'full', redirectTo: 'admin/blogs' },
  {
    path: 'blog',
    loadChildren: () =>
      import('./modules/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },*/
