import { SingleResponseModel } from './../models/singleResponseModel';
import { ListResponsModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogModel } from '../models/blogModel';
import { BlogDetailModel } from '../models/blogDetailModel';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseApiUrl = 'https://localhost:44313/api/blogs/';
  isDetailOpened:boolean;
  isHomeOpened:boolean;
  constructor(private httClient: HttpClient) {}

  getAll(): Observable<ListResponsModel<BlogModel>> {
    let apiUrl = this.baseApiUrl + 'getall';
    return this.httClient.get<ListResponsModel<BlogModel>>(apiUrl);
  }
  addBlog(blogModel: BlogModel) {
    let apiUrl = this.baseApiUrl + 'add';
    return this.httClient.post(apiUrl, blogModel);
  }

  updateBlog(blogModel:BlogModel){
    let apiUrl = this.baseApiUrl + 'update';
    return this.httClient.post(apiUrl,blogModel); 
  }

  getBlogDetails(id: number): Observable<SingleResponseModel<BlogDetailModel>> {
    let apiUrl = this.baseApiUrl + 'getblogdetails?id=' + id;
    return this.httClient.get<SingleResponseModel<BlogDetailModel>>(apiUrl);
  }

  getBlogById(id:number):Observable<SingleResponseModel<BlogModel>>{
    let apiUrl= this.baseApiUrl + 'getblogbyid?blogId='+id;
    return this.httClient.get<SingleResponseModel<BlogModel>>(apiUrl);
  }

}
