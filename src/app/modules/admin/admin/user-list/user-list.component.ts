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
  pageNumber:number=1;
  pageSize:number=8;
  totalData:number=0;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBlogsPaginated(this.pageNumber,this.pageSize);
  }

  //get users from db
  getUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        //this.users = response.data;
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
        this.toastr.info(response.message);
        console.log(response)
        this.getBlogsPaginated(this.pageNumber,this.pageSize);
      },
      (responseError) => {
        this.toastr.info(responseError.message);
        console.log(responseError)
      }
    );
  }

  //get blogs paginated on bakcend
  getBlogsPaginated(pageNumber:number,pageSize:number){
    this.userService.getBlogsPaginated(pageNumber,pageSize).subscribe((response)=>{
     if(response){
      this.users=response.data;
      this.totalData = response.data.length
     }
    })
  }

  //increase the number of page
  increasePageNumber(){
    this.pageNumber+=1;
    this.getBlogsPaginated(this.pageNumber,this.pageSize);
  }

  //decrease the number of page
  decreasePageNumber(){
    if(this.pageNumber!=1){
      this.pageNumber-=1;
      this.getBlogsPaginated(this.pageNumber,this.pageSize);
    }
  }

  //set page number to given number
  setPageNumber(pageNumber:number){
    this.pageNumber=pageNumber;
    this.getBlogsPaginated(this.pageNumber,this.pageSize);
  }
  checkDataAmount(){
    if(this.totalData % 8 !=0){
      return false
    } return true
  }
}
