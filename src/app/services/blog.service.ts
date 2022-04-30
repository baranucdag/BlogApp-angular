import { SingleResponseModel } from './../models/singleResponseModel';
import { ListResponsModel } from './../models/listResponseModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogModel } from '../models/blogModel';
import { BlogDetailModel } from '../models/blogDetailModel';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseApiUrl = 'https://localhost:44313/api/blogs/';
  constructor(private httClient: HttpClient) {}

  //get all blogs
  getAll():Observable<ListResponsModel<BlogModel>>{
    let apiUrl = this.baseApiUrl + 'getall';
    return this.httClient.get<ListResponsModel<BlogModel>>(apiUrl);
  }

  //get all blogs by filter
  get(search: string): Observable<ListResponsModel<BlogModel>> {
    let apiUrl = this.baseApiUrl + 'get';
    let params: HttpParams = new HttpParams();
    params = params.set('search', search);
    return this.httClient.get<ListResponsModel<BlogModel>>(apiUrl+'/',{params:params,});
  }

  //add a blog
  addBlog(blogModel: BlogModel) {
    let apiUrl = this.baseApiUrl + 'add';
    return this.httClient.post(apiUrl, blogModel);
  }

  //update blog
  updateBlog(blogModel: BlogModel) {
    let apiUrl = this.baseApiUrl + 'update';
    return this.httClient.post(apiUrl, blogModel);
  }

  //delete blog
  deleteBlog(blogModel: BlogModel) {
    let apiUrl = this.baseApiUrl + 'delete';
    return this.httClient.post(apiUrl, blogModel);
  }

  //get blog details
  getBlogDetails(id: number): Observable<SingleResponseModel<BlogDetailModel>> {
    let apiUrl = this.baseApiUrl + 'getblogdetails?id=' + id;
    return this.httClient.get<SingleResponseModel<BlogDetailModel>>(apiUrl);
  }

  //get blog by blog id
  getBlogById(id: number): Observable<SingleResponseModel<BlogModel>> {
    let apiUrl = this.baseApiUrl + 'getblogbyid?id=' + id;
    return this.httClient.get<SingleResponseModel<BlogModel>>(apiUrl);
  }
}
