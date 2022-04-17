import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  //asenkron işlemler için
  //başlangıç değeri null
  blogDetail = new BehaviorSubject(<any>null);
  
  constructor() {}
}
