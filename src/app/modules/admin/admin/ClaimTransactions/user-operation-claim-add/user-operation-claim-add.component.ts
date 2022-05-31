import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UserOperationClaimService } from './../../../../../core/services/user-operation-claim.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from './../../../../../core/models/userModel';
import { UserOperationCLaimModel } from './../../../../../core/models/userOperationClaimModel';
import { OperationClaimService } from './../../../../../core/services/operation-claim.service';
import { UserService } from './../../../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-operation-claim-add',
  templateUrl: './user-operation-claim-add.component.html',
  styleUrls: ['./user-operation-claim-add.component.css'],
})
export class UserOperationClaimAddComponent implements OnInit {
  operationClaims: any[] = [];
  users: UserModel[] = [];
  addForm: FormGroup;

  constructor(
    private userService: UserService,
    private operationService: OperationClaimService,
    private userOperationService:UserOperationClaimService,
    private toastr:ToastrService,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getClaims();
    this.createUserClaimAddFrom();
  }

  createUserClaimAddFrom() {
    this.addForm = this.form.group({
      operationClaimId: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }

  //get all operation claims from service
  getClaims() {
    this.operationService.GetAllClaims().subscribe((response) => {
      this.operationClaims = response.data;
    });
  }

  //get all users from service
  getUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response.data;
    });
  }

  Add(){
    if(this.addForm.value){
      let model:UserOperationCLaimModel = Object.assign({},this.addForm.value)
      console.log(model)
      this.userOperationService.add(model).subscribe((response)=>{
        this.toastr.success('User Operation Claim Added');
      },
      (errorResponse)=>{
        this.toastr.error('Claim couldnt added!');
      });
    }
  }
}
