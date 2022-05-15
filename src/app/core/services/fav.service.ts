import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponsModel } from '../models/listResponseModel';
import { FavModel } from '../models/favModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class FavService {
  baseApiUrl = 'https://localhost:44313/api/favs/';
  constructor(private httpClient: HttpClient) {}

  //get favs by blog id
  getFavsByBlogId(id: number): Observable<ListResponsModel<FavModel>> {
    let apiUrl = this.baseApiUrl + 'GetAllByBlogId?blogId=' + id;
    return this.httpClient.get<ListResponsModel<FavModel>>(apiUrl);
  }

  //get fav count by blog id
  getFavCount(id:number):Observable<SingleResponseModel<number>>{
    let apiUrl = this.baseApiUrl + 'GetFavCount?id='+ id;
    return this.httpClient.get<SingleResponseModel<number>>(apiUrl);
  }

  //add fav
  addFav(fav:any) {
    let apiUrl = this.baseApiUrl + 'add';
    return this.httpClient.post(apiUrl, fav);
  }

  //delete fav
  deleteFav(fav:any) {
    let apiUrl = this.baseApiUrl + 'delete';
    return this.httpClient.post(apiUrl, fav);
  }
}
