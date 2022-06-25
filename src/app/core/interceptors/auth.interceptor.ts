import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService:AuthService, private toastr:ToastrService, private router:Router) {}
  //adding something extra to request (token)
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.authService.isExpired()){
      this.toastr.error("please login!")
      localStorage.removeItem("token");
      this.router.navigate([])
    }
    let token = localStorage.getItem("token");  
    let newRequest:HttpRequest<any>;            
    newRequest=request.clone({
      headers:request.headers.set("Authorization","Bearer " + token)  //set new request headers
    })
    return next.handle(newRequest);      //handle new request
  } 
}
