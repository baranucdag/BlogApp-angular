import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  year:string;
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createRegisterform();
    this.getYear();
  }

  //create register form
  createRegisterform() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //register operations
  register() {
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        console.log(response.data)
        this.toastrService.info(response.message);
      },
      errorResponse=>{
        this.toastrService.error("user already exist")
        console.log("user already exist")
      })
    }
  }

  //get year 
  getYear(){
    this.year=new Date().getFullYear().toString();
  }
}
