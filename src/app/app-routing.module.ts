import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { LoginGuard } from './guards/login.guard';
import { BlogAddComponent } from './components/blog-add/blog-add.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BlogComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/detail/:id', component: BlogDetailComponent },
  { path: 'blog/add', component: BlogAddComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
