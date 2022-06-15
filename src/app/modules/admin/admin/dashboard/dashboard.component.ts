import { UserOperationClaimService } from './../../../../core/services/user-operation-claim.service';
import { OperationClaimService } from './../../../../core/services/operation-claim.service';
import { CategoryService } from '../../../../core/services/category.service';
import { UserService } from '../../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  blogAmount:number;
  userAmount:number;
  categoryAmount:number;
  claimAmount:number;
  userOperationClaimAmount:number;
  
  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private categoryService:CategoryService,
    private operationClaimService:OperationClaimService,
    private userOperationClaimService:UserOperationClaimService
  ) {}

  ngOnInit(): void {
    this.getAmounts();
  }

  getAmounts(){
    this.blogService.getAll().subscribe((response)=>{
      this.blogAmount = response.data.length;
    })
    this.userService.getAllUsers().subscribe((response)=>{
      this.userAmount = response.data.length;
    })
    this.categoryService.getAll().subscribe((response)=>{
      this.categoryAmount = response.data.length;
    })
    this.operationClaimService.GetAllClaims().subscribe((response)=>{
      this.claimAmount = response.data.length;
    })
    this.userOperationClaimService.getAllDetailsPaged(1,1100).subscribe((response)=>{
      this.userOperationClaimAmount = response.data.length;
    })
  }
}
