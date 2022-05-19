import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../../../core/models/userModel';
import { UserService } from '../../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {

  users: UserModel[] = [];

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  //get users from db
  getUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response.data;
        this.toastr.info(response.message);
      },
      (errorResponse) => {
        this.toastr.error(errorResponse.message);
      }
    );
  }

  //delete user
  delete(user: UserModel) {
    this.userService.delete(user).subscribe(
      (response) => {
        this.toastr.info('user deleted');
        this.getUsers();
      },
      (responseError) => {
        this.toastr.info(responseError.message);
      }
    );
  }
}
