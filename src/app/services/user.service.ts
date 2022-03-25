import { ListResponsModel } from './../models/listResponseModel';
import { UserModel } from './../models/userModel';
import { SingleResponseModel } from './../models/singleResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl:string = 'https://localhost:44313/api/users/';
  constructor(private httpClient: HttpClient) {}

  getUserById(id:number) {
    let apiUrl = this.baseApiUrl + 'User/getbyıd?id='+id;
    return this.httpClient.get<SingleResponseModel<UserModel>>(apiUrl);
  }
}
