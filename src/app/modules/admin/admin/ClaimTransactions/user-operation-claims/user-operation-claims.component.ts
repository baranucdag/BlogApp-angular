import { ToastrService } from 'ngx-toastr';
import { UserOperationClaimService } from './../../../../../core/services/user-operation-claim.service';
import { Component, OnInit } from '@angular/core';
import { UserOperationCLaimModel } from 'src/app/core/models/userOperationClaimModel';
import { Form, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-operation-claims',
  templateUrl: './user-operation-claims.component.html',
  styleUrls: ['./user-operation-claims.component.css'],
})
export class UserOperationClaimsComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 8;
  userOperationClaims: UserOperationCLaimModel[] = [];
  userOperationClaimAddForm:FormGroup
  totalData:number=0;

  constructor(
    private userOperationService: UserOperationClaimService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllPaged(this.pageNumber, this.pageSize);
  }

  getAllPaged(pageNumber: number, pageSize: number) {
    this.userOperationService
      .getAllDetailsPaged(pageNumber, pageSize)
      .subscribe((response) => {
        this.userOperationClaims = response.data;
        this.totalData = response.data.length
      });
  }

  delete(model:UserOperationCLaimModel){
    this.userOperationService.delete(model).subscribe((response)=>{
      this.toastr.info(response.message);
      this.getAllPaged(this.pageNumber, this.pageSize)
    },(errorResponse)=>{
      this.toastr.error('User operation claim couldnt deleted!');
    })
  }

  //increase the number of page
  increasePageNumber(){
    this.pageNumber+=1;
    this.getAllPaged(this.pageNumber,this.pageSize);
  }

  //decrease the number of page
  decreasePageNumber(){
    if(this.pageNumber!=1){
      this.pageNumber-=1;
      this.getAllPaged(this.pageNumber,this.pageSize);
    }
  }

  //set page number to given number
  setPageNumber(pageNumber:number){
    this.pageNumber=pageNumber;
    this.getAllPaged(this.pageNumber,this.pageSize);
  }

  checkDataAmount(){
    if(this.totalData % 8 !=0 ){
      return false
    } return true
  }
}
