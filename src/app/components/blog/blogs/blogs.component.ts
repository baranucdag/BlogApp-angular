import { DetailService } from 'src/app/services/detail.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogDetailModel } from 'src/app/models/blogDetailModel';
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
  blogHeader:string = 'Blog Application';
  datePipe: DatePipe;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private detailService: DetailService
  ) {}

  ngOnInit(): void {
    this.getBlogs();
    console.log(this.blogHeader);
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

  dateToString(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
