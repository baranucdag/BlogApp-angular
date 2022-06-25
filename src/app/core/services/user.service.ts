import { ResponseModel } from './../models/responseModel';
import { ListResponsModel } from '../models/listResponseModel';
import { UserModel } from '../models/userModel';
import { SingleResponseModel } from '../models/singleResponseModel';
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
    let apiUrl = this.baseApiUrl + 'GetByUserById?id='+id;
    return this.httpClient.get<SingleResponseModel<UserModel>>(apiUrl);
  }

  getAllUsers():Observable<ListResponsModel<UserModel>>{
    let apiUrl = this.baseApiUrl + 'getall';
    return this.httpClient.get<ListResponsModel<UserModel>>(apiUrl);
  }

  delete(user:UserModel):Observable<ResponseModel>{
    let apiUrl = this.baseApiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(apiUrl,user);
  }

   //get users paginated on backend
   getBlogsPaginated(pageNumber:number,pageSize:number):Observable<ListResponsModel<UserModel>>{
    let apiUrl = this.baseApiUrl + 'GetUserPaged?pageNumber='+pageNumber+'&pageSize='+pageSize;
    return this.httpClient.get<ListResponsModel<UserModel>>(apiUrl);
  }

}
