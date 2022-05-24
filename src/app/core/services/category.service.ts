import { ListResponsModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/categoryModel';
import { AotCompiler } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseApiUrl = 'https://localhost:44313/api/categories/';

  constructor(private httCliect:HttpClient) { }

  //get all categories
  getAllCategories():Observable<ListResponsModel<CategoryModel>>{
    let apiUrl = this.baseApiUrl + 'getall';
    return this.httCliect.get<ListResponsModel<CategoryModel>>(apiUrl);
  }

  //add category
  addCategory(categoryName:string){
    let apiUrl = this.baseApiUrl + 'add';
    return this.httCliect.post(apiUrl,categoryName);
  }

  //delete category
  deleteCategory(category:CategoryModel){
    let apiUrl = this.baseApiUrl + 'delete';
    return this.httCliect.post(apiUrl,category);
  }
}
