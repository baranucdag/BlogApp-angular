import { ToastrService } from 'ngx-toastr';
import { UserModel } from './../../../../models/userModel';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  users: UserModel[] = [];

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
    };
    this.getUsers();
  }

  //get users from db
  getUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response.data;
        this.toastr.info(response.message);
        this.dtTrigger.next()
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
