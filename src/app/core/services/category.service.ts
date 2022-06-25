import { ListResponsModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/categoryModel';
import { AotCompiler } from '@angular/compiler';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseApiUrl = 'https://localhost:44313/api/categories/';

  constructor(private httCliect:HttpClient) { }

  //get all categories paged
  getAllCategories(pageNumber:number,pageSize:number):Observable<ListResponsModel<CategoryModel>>{
    let apiUrl = this.baseApiUrl + 'GetAllPaged?pageNumber=' +
    pageNumber +
    '&pageSize=' +
    pageSize;
    return this.httCliect.get<ListResponsModel<CategoryModel>>(apiUrl);
  }

  getAll():Observable<ListResponsModel<CategoryModel>>{
    let apiUrl = this.baseApiUrl + 'getall';
    return this.httCliect.get<ListResponsModel<CategoryModel>>(apiUrl);
  }

  //add category
  addCategory(categoryName:string):Observable<ResponseModel>{
    let apiUrl = this.baseApiUrl + 'add';
    return this.httCliect.post<ResponseModel>(apiUrl,categoryName);
  }

  //delete category
  deleteCategory(category:CategoryModel):Observable<ResponseModel>{
    let apiUrl = this.baseApiUrl + 'delete';
    return this.httCliect.post<ResponseModel>(apiUrl,category);
  }
}
