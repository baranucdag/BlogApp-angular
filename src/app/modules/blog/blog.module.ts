import { BlogRoutingModule } from './blog-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { BlogsComponent } from './blog/blogs/blogs.component';
import { AboutComponent } from './blog/about/about.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogAddComponent } from './blog/blog-add/blog-add.component';

@NgModule({
  declarations: [
    BlogComponent,
    BlogsComponent,
    AboutComponent,
    BlogEditComponent,
    BlogDetailComponent,
    BlogAddComponent,
  ],
  imports: [CommonModule, ToastrModule, BlogRoutingModule],
})
export class BlogModule {}
