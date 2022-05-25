import { ListResponsModel } from '../models/listResponseModel';
import { CommentDetailModel} from '../models/commentDetailModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../models/commentModel';
import { CommentPostModel } from '../models/commentPostModel';
import { SingleResponseModel } from '../models/singleResponseModel';

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

  //get comment details by id
  getCommentDetailsByBlogId(id:number):Observable<ListResponsModel<CommentDetailModel>>{
    let apiUrl = this.baseApiUrl + 'GetCommentDetails?id='+id;
    return this.httpClient.get<ListResponsModel<CommentDetailModel>>(apiUrl);
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

  //delete comment by id
  deleteCommentById(id:number){
    let apiUrl = this.baseApiUrl + 'DeleteById?id='+id;
    return this.httpClient.post(apiUrl,id)
  }
}
