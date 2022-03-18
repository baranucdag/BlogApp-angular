import { ListResponsModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../models/blogModel';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseApiUrl = 'https://localhost:44313/api/blogs/';
  constructor(private httClient: HttpClient) {}

  getAll(): Observable<ListResponsModel<Blog>> {
    let apiUrl = this.baseApiUrl + 'getall';
    return this.httClient.get<ListResponsModel<Blog>>(apiUrl);
  }
}
