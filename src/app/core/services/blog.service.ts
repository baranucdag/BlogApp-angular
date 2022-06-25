import { QueryParamsModel } from './../models/queryParamsModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ListResponsModel } from '../models/listResponseModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogModel } from '../models/blogModel';
import { BlogDetailModel } from '../models/blogDetailModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseApiUrl = 'https://localhost:44313/api/blogs/';

  constructor(private httClient: HttpClient) {}

  //get all blogs
  getAll(): Observable<ListResponsModel<BlogModel>> {
    let apiUrl = this.baseApiUrl + 'getall';
    return this.httClient.get<ListResponsModel<BlogModel>>(apiUrl);
  }

  //get blogs paged (try to do by cursor paged method)
  getBlogsPaged(
    count: number,
    cursor: number
  ): Observable<ListResponsModel<BlogModel>> {
    let apiUrl =
      this.baseApiUrl + 'GetAllPaged?Count=' + count + '1&Cursor=' + cursor;
    return this.httClient.get<ListResponsModel<BlogModel>>(apiUrl);
  }

  //get all blogs by filter
  get(queryParams: QueryParamsModel): Observable<ListResponsModel<BlogModel>> {
    let apiUrl =
      this.baseApiUrl +
      'getblogs?QueryString=' +
      queryParams.queryString +
      '&SortType=' +
      queryParams.sortType +
      '&Count=' +
      queryParams.count +
      '&TotalCount=' +
      queryParams.totalCount;
    let params: HttpParams = new HttpParams();
    params = params.set('search', queryParams.queryString);
    return this.httClient.get<ListResponsModel<BlogModel>>(apiUrl);
  }

  //add a blog
  addBlog(sendForm: any):Observable<ResponseModel>{
    let apiUrl = 'https://localhost:44313/api/blogs/add';
    return this.httClient.post<ResponseModel>(apiUrl, sendForm);
  }

  //update blog
  updateBlog(sendForm: any) {
    let apiUrl = this.baseApiUrl + 'update';
    return this.httClient.post(apiUrl, sendForm);
  }

  //delete blog
  deleteBlog(blogModel: BlogModel) :Observable<ResponseModel>{
    let apiUrl = this.baseApiUrl + 'delete';
    return this.httClient.post<ResponseModel>(apiUrl, blogModel);
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

  //get blogs paginated on backend
  getBlogsPaginated(
    pageNumber: number,
    pageSize: number
  ): Observable<BlogModel[]> {
    let apiUrl =
      this.baseApiUrl +
      'GetBlogsPaged?pageNumber=' +
      pageNumber +
      '&pageSize=' +
      pageSize;
    return this.httClient.get<BlogModel[]>(apiUrl);
  }

  //get all blogs details
  getAllDetails(pageNumber:number,pageSize:number): Observable<ListResponsModel<BlogDetailModel>> {
    let apiUrl = this.baseApiUrl + 'GetAllDetalis?pageNumber='+pageNumber+'&pageSize='+pageSize;
    return this.httClient.get<ListResponsModel<BlogDetailModel>>(apiUrl);
  }
}
