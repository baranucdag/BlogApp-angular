import { SingleResponseModel } from '../models/singleResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageModel } from '../models/imageModel';
import { ListResponsModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  BaseApiUrl='https://localhost:44313/api/Images/';
  constructor(private httpClient:HttpClient) { }

  getByBlogId(id:number):Observable<SingleResponseModel<ImageModel>>{
    let apiUrl = this.BaseApiUrl + 'GetByBlogId?blogId='+id;
    return this.httpClient.get<SingleResponseModel<ImageModel>>(apiUrl);
  }

  getAllImages():Observable<ListResponsModel<ImageModel>>{
    let apiUrl = this.BaseApiUrl + 'getAll';
    return this.httpClient.get<ListResponsModel<ImageModel>>(apiUrl);
  }
}
