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

  constructor() {}

  //adding something extra to request (token)
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token");  //get token
    let newRequest:HttpRequest<any>;            //define new request
    newRequest=request.clone({
      headers:request.headers.set("Authorization","Bearer " + token)  //set new request headers
    })
    return next.handle(newRequest);      //handle new request
  }
}
