import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm:FormGroup

  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createContactForm();
  }

  createContactForm(){
    this.contactForm=this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      phoneNumber:['',Validators.required],
      message:['',Validators.required]
    })
  }
}
//contact döndürülecek