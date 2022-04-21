import { BlogModel } from './../../../../models/blogModel';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from './../../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  blogs: BlogModel[] = [];
  constructor(
    private blogService: BlogService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getAll().subscribe((response) => {
      console.log(response.message);
      this.blogs = response.data;
      this.dtTrigger.next();
    });
  }

  delete(blogModel: BlogModel) {
    this.blogService.deleteBlog(blogModel).subscribe(
      (response) => {
        this.toastr.info('Blog Deleted!');
        this.getBlogs();
      },
      (errorResponse) => {
        this.toastr.error(errorResponse.message);
      }
    );
  }
}
