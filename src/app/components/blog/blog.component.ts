import { DetailService } from './../../services/detail.service';
import { BlogModel } from 'src/app/models/blogModel';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { BlogDetailModel } from 'src/app/models/blogDetailModel';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogs: BlogModel[] = [];
  id: number;
  blogCount: number = 6;
  blogHeader?: string;
  blogHeaderSet: boolean;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private detailService: DetailService
  ) {}

  ngOnInit(): void {
    this.getAllBlogs();

    this.detailService.blogDetail.subscribe((detail) => {
      if (detail) {
        this.blogHeader = detail.blogTitle;
      }
    });
  }

  //get all blogs
  getAllBlogs() {
    this.blogService.getAll().subscribe((response) => {
      this.blogs = response.data;
    });
  }

  //increse number of blog on main page
  riseCountOfBlog() {
    this.blogCount = this.blogCount + 5;
  }
}
