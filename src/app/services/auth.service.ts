import { Observable } from 'rxjs';
import { RegisterModel } from './../models/registerModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { LoginModel } from './../models/loginModel';
import { TokenModel } from './../models/tokenModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  baseApiUrl= 'https://localhost:44313/api/auth/';

  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel):Observable<SingleResponseModel<TokenModel>> {
    let apiUrl:string = this.baseApiUrl+'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(apiUrl,loginModel);
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let apiUrl=this.baseApiUrl+'register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(apiUrl,registerModel);
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
