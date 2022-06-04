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
        this.userOperationClaims = response;
      });
  }

  delete(model:UserOperationCLaimModel){
    this.userOperationService.delete(model).subscribe((response)=>{
      this.toastr.info('User operation claim deleted!');
      this.getAllPaged(this.pageNumber, this.pageSize)
    },(errorResponse)=>{
      this.toastr.error('User operation claim couldnt deleted!');
    })
  }
}
