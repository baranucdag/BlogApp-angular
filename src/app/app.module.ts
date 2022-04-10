import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogAddComponent } from './components/blog/blog-add/blog-add.component';
import { AboutComponent } from './components/blog/about/about.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { NaviComponent } from './components/navigation/navi.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReversePipe } from './pipes/reverse.pipe';
import { BlogsComponent } from './components/blog/blogs/blogs.component';
import { BlogEditComponent } from './components/blog/blog-edit/blog-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    LoginComponent,
    NaviComponent,
    FooterComponent,
    RegisterComponent,
    BlogAddComponent,
    AboutComponent,
    BlogDetailComponent,
    ReversePipe,
    BlogsComponent,
    BlogEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
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
