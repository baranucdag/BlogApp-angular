import { ListResponsModel } from './../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/categoryModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseApiUrl = 'https://localhost:44313/api/categories/';

  constructor(private httCliect:HttpClient) { }

  getAllCategories():Observable<ListResponsModel<CategoryModel>>{
    let apiUrl = this.baseApiUrl + 'getall';
    return this.httCliect.get<ListResponsModel<CategoryModel>>(apiUrl);
  }
}
