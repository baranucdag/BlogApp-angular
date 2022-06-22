import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';

import { NaviComponent } from './core/components/navigation/navi.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReversePipe } from './core/pipes/reverse.pipe';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
