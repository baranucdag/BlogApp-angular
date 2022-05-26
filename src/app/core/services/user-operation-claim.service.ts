import { UserOperationCLaimModel } from './../models/userOperationClaimModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponsModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {
  baseAPiUrl = 'https://localhost:44313/api/UserOperationClaims/'
  constructor(private httClient:HttpClient) { }

  getAllDetailsPaged(pageNumber:number,pageSize:number):Observable<UserOperationCLaimModel[]>{
    let apiUrl = this.baseAPiUrl + 'GetAllDetails?pageNumber='+pageNumber +'&pageSize=' + pageSize;
    return this.httClient.get<UserOperationCLaimModel[]>(apiUrl);
  }

  getDetailsByUserId(id:number):Observable<ListResponsModel<UserOperationCLaimModel>>{
    let apiUrl = this.baseAPiUrl + 'GetDetailsByUserId?id=' +id;
    return this.httClient.get<ListResponsModel<UserOperationCLaimModel>>(apiUrl);
  }

  add(userId:number,operationClaimId:number){
    let apiUrl = this.baseAPiUrl + ''
  }

  delete(model:UserOperationCLaimModel){
    let apiUrl = this.baseAPiUrl + 'delete';
    return this.httClient.post(apiUrl,model);
  }

}
