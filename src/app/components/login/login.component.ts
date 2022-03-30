import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();

  }

  //create login form
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  //login operations: hide token in localstorage
  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          //todo:proje bitince commend'a al
          console.log(response.data);
          this.toastrService.info(response.message);
          if (response.data.token != null) {
            localStorage.setItem('token', response.data.token);
          }
          else[
            this.toastrService.error("Token error!")
          ]
          this.router.navigate(['blog'])
        },
        (responseError) => {
          console.log(responseError);
          this.toastrService.error(responseError.error);
        }
      );
    }
  }
}
