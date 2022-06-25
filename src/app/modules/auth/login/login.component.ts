import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  test : Date = new Date();
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
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
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          console.log(response.data);
          this.toastrService.info(response.message);
          if (response.data.token != null) {
            localStorage.setItem('token', response.data.token);
            console.log(response.data)
          } else {
            this.toastrService.error('Token error!');
          }
          this.authService.setUserStats()
          this.router.navigate([''])
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }
}
