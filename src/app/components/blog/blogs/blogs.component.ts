import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { LocalStorageService } from './../../../services/local-storage.service';
import { DetailService } from 'src/app/services/detail.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogDetailModel } from 'src/app/models/blogDetailModel';
import { BlogModel } from 'src/app/models/blogModel';
import { BlogService } from 'src/app/services/blog.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs: BlogModel[] = [];
  blogCount: number = 5;
  search = '';
  blogHeader: string = 'Blog Application';
  currentUserId: any;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private detailService: DetailService,
    private authService: AuthService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getBlogs();
  }

  //get all blogs
  getBlogs() {
    this.blogService.getAll().subscribe((response) => {
      this.blogs = response.data;
      this.detailService.blogDetail.next(this.blogHeader);
    });
  }

  //navigate to detail component by choosen blog
  onSelect(id: number) {
    this.router.navigate(['blog/detail/' + id]);
  }
  //reise the amount of blog on main page
  riseCountOfBlog() {
    this.blogCount = this.blogCount + 5;
  }

  //get current user id from auth service (decode jwt token by using JwtHelper)
  getCurrentUser() {
    this.currentUserId = this.authService.currentUserId;
  }

  //return true if current user is author of the blog
  isAuthor(blog: BlogModel) {
    if (blog.userId == this.currentUserId) {
      return true;
    }
    else return false;
  }

  //navidate to edit component when author of the blog click to edit button 
  navigateEdit(blog:BlogModel){
    this.router.navigate(['blog/edit/' + blog.id]);
  }

  //delete given blog
  delete(blog:BlogModel){
    this.blogService.deleteBlog(blog).subscribe((response)=>{
      this.toastr.success("Blog Deleted")
      this.getBlogs();
    },
    (errorResponse)=>{
      this.toastr.error(errorResponse.message)
    })
  }
}
