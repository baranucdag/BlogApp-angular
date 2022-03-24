import { ContactModel } from './../models/contactModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient:HttpClient) { }

  postMessage(contactModel:ContactModel){
    //ne yapmak gerekir.
  }
}
