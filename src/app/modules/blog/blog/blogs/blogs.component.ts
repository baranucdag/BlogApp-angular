import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogModel } from 'src/app/core/models/blogModel';
import { QueryParamsModel } from 'src/app/core/models/queryParamsModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { BlogService } from 'src/app/core/services/blog.service';
import { DetailService } from 'src/app/core/services/detail.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: BlogModel[] = [];
  sortType: boolean = true;
  totalCount = 0;
  blogCount: number = 5;
  search = '';
  blogHeader: any = 'Blog Application';
  currentUserId: any;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private detailService: DetailService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.detailService.blogDetail.next(null);
    this.getCurrentUser();
    this.getBlogs();
  }

  //get all blogs by filter
  getBlogs() {
    let search: QueryParamsModel = {
      queryString: this.search,
      sortType: this.sortType,
      count: this.blogCount,
      totalCount: this.totalCount,
    };
    this.blogService.get(search).subscribe((response) => {
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
    this.getBlogs();
  }

  //get current user id from auth service (decode jwt token by using JwtHelper)
  getCurrentUser() {
    this.currentUserId = this.authService.currentUserId;
  }

  //return true if current user is author of the blog
  isAuthor(blog: BlogModel) {
    if (blog.userId == this.currentUserId) {
      return true;
    } else return false;
  }

  //navigate to edit component when author of the blog click to edit button
  navigateEdit(blog: BlogModel) {
    this.router.navigate(['blog/edit/' + blog.id]);
  }

  //delete given blog
  delete(blog: BlogModel) {
    this.blogService.deleteBlog(blog).subscribe(
      (response) => {
        this.toastr.success('Blog Deleted');
        this.getBlogs();
      },
      (errorResponse) => {
        this.toastr.error(errorResponse.message);
      }
    );
  }

}
