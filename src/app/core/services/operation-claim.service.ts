import { ListResponsModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClaimModel } from '../models/claimModel';

@Injectable({
  providedIn: 'root',
})
export class OperationClaimService {
  baseApiUrl: string = 'https://localhost:44313/api/OperationsClaims/';

  constructor(private httpClient: HttpClient) {}

  //get claim details paged
  getClaimsPaged(
    pageNumber: number,
    pageSize: number
  ): Observable<ListResponsModel<ClaimModel>> {
    let apiUrl =
      this.baseApiUrl +
      'GellAllClaimsPaged?pageNumber=' +
      pageNumber +
      '&pageSize=' +
      pageSize;
    return this.httpClient.get<ListResponsModel<ClaimModel>>(apiUrl);
  }

  //get user claims details
  getClaimById(id: number) {
    let apiUrl = this.baseApiUrl + 'GetClaimById?id=' + id;
    return this.httpClient.get(apiUrl);
  }

  //add a claim model
  addClaim(name: string) {
    let apiUrl = this.baseApiUrl + 'Add';
    return this.httpClient.post(apiUrl, name);
  }

  //delete a claim model
  DeleteClaim(claimModel: ClaimModel) {
    let apiUrl = this.baseApiUrl + 'Delete';
    return this.httpClient.post(apiUrl, claimModel);
  }

  GetAllClaims(): Observable<ListResponsModel<ClaimModel>> {
    let apiUrl = this.baseApiUrl + 'GetAll';
    return this.httpClient.get<ListResponsModel<ClaimModel>>(apiUrl);
  }
}
