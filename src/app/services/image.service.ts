import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  BaseApiUrl='https://localhost:44313/api/images/';
  constructor(private httpClient:HttpClient) { }

  getImageById(id:number){
    let apiUrl = this.BaseApiUrl +'getByBlogId?blogId='+id;
    return this.httpClient.get(apiUrl); 
  }
}
