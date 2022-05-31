import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterCheckModel } from 'src/app/core/models/registerCheckModel';
import { RegisterModel } from 'src/app/core/models/registerModel';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  year: string;
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterform();
    this.getYear();
  }

  //create register form
  createRegisterform() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      password: ['',Validators.required],
      passwordCheck: ['',Validators.required]
    });
  }

  //register operations
  register() {
      let registerCheckModel: RegisterCheckModel = Object.assign(
        {},
        this.registerForm.value
      );
      if (registerCheckModel.password == registerCheckModel.passwordCheck) {
        let registerModel: RegisterModel = {
          email: registerCheckModel.email,
          firstName: registerCheckModel.firstName,
          lastName: registerCheckModel.lastName,
          password: registerCheckModel.password,
        };
        this.authService.register(registerModel).subscribe(
          (response) => {
            console.log(response.message);
            this.toastrService.info('registered succesfully!');
            this.router.navigate(['/auth/login']);
          },
          (errorResponse) => {
            console.log(errorResponse);
          }
        );
      } else {
        this.toastrService.error('Passwords fields must have the same value!');
        console.log('hata');
      }
  }

  //get year
  getYear() {
    this.year = new Date().getFullYear().toString();
  }
}