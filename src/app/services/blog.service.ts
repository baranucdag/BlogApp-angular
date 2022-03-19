import { ListResponsModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogModel } from '../models/blogModel';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseApiUrl = 'https://localhost:44313/api/blogs/';
  constructor(private httClient: HttpClient) {}

  getAll(): Observable<ListResponsModel<BlogModel>> {
    let apiUrl = this.baseApiUrl + 'getall';
    return this.httClient.get<ListResponsModel<BlogModel>>(apiUrl);
  }

  postBlog(blogModel:BlogModel){
    let apiUrl = this.baseApiUrl+'add';
    return this.httClient.post(apiUrl,blogModel);
  }
}
