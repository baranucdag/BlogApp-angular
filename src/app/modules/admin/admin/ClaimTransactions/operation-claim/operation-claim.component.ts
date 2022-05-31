import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaimModel } from './../../../../../core/models/claimModel';
import { ToastrService } from 'ngx-toastr';
import { OperationClaimService } from './../../../../../core/services/operation-claim.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation-claim',
  templateUrl: './operation-claim.component.html',
  styleUrls: ['./operation-claim.component.css'],
})
export class OperationClaimComponent implements OnInit {
  claimAddForm: FormGroup;
  claims: ClaimModel[] = [];
  pageNumber: number = 1;
  pageSize: number = 8;

  constructor(
    private operClaimService: OperationClaimService,
    private toastr: ToastrService,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createClaimAddForm();
    this.getClaimsPaged(this.pageNumber, this.pageSize);
  }

  createClaimAddForm() {
    this.claimAddForm = this.form.group({
      name: ['', Validators.required],
    });
  }

  getClaimsPaged(pageNumber: number, pageSize: number) {
    this.operClaimService
      .getClaimsPaged(pageNumber, pageSize)
      .subscribe((response) => {
        this.claims = response;
      });
  }

  addClaim() {
      let name = Object.assign({},this.claimAddForm.value)
      this.operClaimService.addClaim(name).subscribe(
        (response) => {
          this.toastr.info('claim added');
          this.getClaimsPaged(this.pageNumber,this.pageSize)
        },
        (errorResponse) => {
          this.toastr.error('claim couldnt added!');
        }
      );
    
  }

  deleteClaim(claimMode: ClaimModel) {
    this.operClaimService.DeleteClaim(claimMode).subscribe(
      (response) => {
        this.toastr.info('claim deleted');
        this.getClaimsPaged(this.pageNumber,this.pageSize);
      },
      (errorResponse) => {
        this.toastr.error('claim couldnt deleted');
      }
    );
  }
}
