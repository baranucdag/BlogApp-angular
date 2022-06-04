import { FooterComponent } from './../../core/components/footer/footer.component';
import { NaviComponent } from './../../core/components/navigation/navi.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared/shared.module';
import { BlogComponent } from './blog.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogAddComponent } from './blog-add/blog-add.component';


@NgModule({
  declarations: [
    BlogAddComponent,
    AboutComponent,
    BlogDetailComponent,
    BlogEditComponent,
    BlogsComponent,
    BlogComponent,
    NaviComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ],
  exports:[
  ]
})
export class BlogModule { }
