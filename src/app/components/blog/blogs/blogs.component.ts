import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogDetailModel } from 'src/app/models/blogDetailModel';
import { BlogModel } from 'src/app/models/blogModel';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})

export class BlogsComponent implements OnInit {
  blogs: BlogModel[] = [];
  blogDetails: BlogDetailModel[] = [];
  blogCount: number = 5;
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
    this.router.navigate(['blog/'+id+'/detail']);

  }
  //reise the amount of blog on main page
  riseCountOfBlog() {
    this.blogCount = this.blogCount + 5;
  }
}
