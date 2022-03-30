import { SingleResponseModel } from './../../models/singleResponseModel';
import { UserModel } from './../../models/userModel';
import { UserService } from './../../services/user.service';
import { BlogModel } from 'src/app/models/blogModel';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { BlogDetailModel } from 'src/app/models/blogDetailModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogs: BlogModel[] = [];
  blogDetails: BlogDetailModel[] = [];
  blogCount: number = 6;
  date:Date;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.getAllBlogs();
  }

  //get all blogs
  getAllBlogs() {
    this.blogService.getAll().subscribe((response) => {
      this.blogs = response.data;
    });
  }

  //navigate to detail component by choosen blog
  onSelect(id: number) {
    this.router.navigate(['blog/detail/' + id]);
  }

  riseCountOfBlog() {
    this.blogCount = this.blogCount + 5;
  }
}
