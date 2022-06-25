import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwthelperService: JwtHelperService = new JwtHelperService();
  get token(): any {
    return localStorage.getItem('token');
  }
  currentUserId: number;
  currentRoles: string;

  baseApiUrl = 'https://localhost:44313/api/auth/';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let apiUrl: string = this.baseApiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      apiUrl,
      loginModel
    );
  }

  isExpired() {
    let token: string | null = this.localStorageService.get('token');
    if (token != null && token != undefined){
      return this.jwthelperService.isTokenExpired(token);
    }else return false
  }

  logout() {
    this.localStorageService.Remove('token');
  }

  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let apiUrl = this.baseApiUrl + 'register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      apiUrl,
      registerModel
    );
  }

  setCurrentUserId() {
    var decoded = this.jwthelperService.decodeToken(this.token);
    var propUserId = Object.keys(decoded).filter((x) =>
      x.endsWith('/nameidentifier')
    )[0];
    this.currentUserId = Number(decoded[propUserId]);
  }

  setRoles() {
    var decoded = this.jwthelperService.decodeToken(this.token);
    var propUserId = Object.keys(decoded).filter((x) => x.endsWith('/role'))[0];
    this.currentRoles = String(decoded[propUserId]);
  }

  getCurrentRoles(): string {
    return this.currentRoles;
  }
  getCurrentUserId(): number {
    return this.currentUserId;
  }

  setUserStats() {
    if (this.isAuthenticated()) {
      this.setCurrentUserId();
      this.setRoles();
    }
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
