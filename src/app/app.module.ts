import { AdminModule } from './modules/admin/admin.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { BlogAddComponent } from './components/blog/blog-add/blog-add.component';
import { AboutComponent } from './components/blog/about/about.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { NaviComponent } from './core/components/navigation/navi.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReversePipe } from './core/pipes/reverse.pipe';
import { BlogsComponent } from './components/blog/blogs/blogs.component';
import { BlogEditComponent } from './components/blog/blog-edit/blog-edit.component';
import { AuthModule } from './modules/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    NaviComponent,
    FooterComponent,
    BlogAddComponent,
    AboutComponent,
    BlogDetailComponent,
    ReversePipe,
    BlogsComponent,
    BlogEditComponent,
  ],
  imports: [
    AdminModule,
    AuthModule,
    BrowserModule,
    DataTablesModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
