import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { DetailService } from 'src/app/services/detail.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogModel } from 'src/app/models/blogModel';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs: BlogModel[] = [];
  blogCount: number = 5;
  search = '';
  blogHeader: any = 'Blog Application';
  currentUserId: any;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private detailService: DetailService,
    private authService: AuthService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
  this.detailService.blogDetail.next(null);
    this.getCurrentUser();
    this.getBlogs();
  }

  //get all blogs by filter
  getBlogs() {
    this.blogService.get(this.search).subscribe((response) => {
      this.blogs = response.data;
    });
  }

  //navigate to detail component by choosen blog
  onSelect(id: number) {
    this.router.navigate(['blog/detail/' + id]);
  }

  //raise the amount of blog on main page
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

  //navigate to edit component when author of the blog click to edit button 
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
