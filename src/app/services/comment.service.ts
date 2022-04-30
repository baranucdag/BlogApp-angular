import { ListResponsModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../models/commentModel';
import { CommentPostModel } from '../models/commentPostModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseApiUrl = 'https://localhost:44313/api/Comments/';   
  constructor(private httpClient:HttpClient) { }

  //get all cooments
  getAllComments():Observable<ListResponsModel<CommentModel>>{
    let apiUrl = this.baseApiUrl + 'getall';
    return this.httpClient.get<ListResponsModel<CommentModel>>(apiUrl);
  }

  //get comments by blog id
  getByBlogId(id:number):Observable<ListResponsModel<CommentModel>>{
    let apiUrl = this.baseApiUrl + 'GetByBlogId?blogId='+ id;
    return this.httpClient.get<ListResponsModel<CommentModel>>(apiUrl);
  }

  // add a comment
  addComment(model:CommentPostModel){
    let apiUrl = this.baseApiUrl + 'add';
    return this.httpClient.post(apiUrl,model);
  }

  //delete a comment
  deleteComment(model:CommentModel){
    let apiUrl = this.baseApiUrl + 'delete';
    return this.httpClient.post(apiUrl,model);
  }
}
