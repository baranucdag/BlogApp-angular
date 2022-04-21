import { CategoryService } from './../../../../services/category.service';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  blogAmount:number;
  userAmount:number;
  categoryAmount:number;
  
  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private categoryService:CategoryService
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
    this.categoryService.getAllCategories().subscribe((response)=>{
      this.categoryAmount = response.data.length;
    })
  }
}
