import { BlogDetailModel } from 'src/app/models/blogDetailModel';
import { BlogService } from './../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  id: number = 0;
  blogDetail: BlogDetailModel;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.getParameter();
    this.getBlogDetails();
  }

  getParameter() {
    this.route.params.subscribe((params) => {
      if (params !== null && params !== undefined) {
        this.id = Number(params['id']);
        console.log(this.id)
      }
    });
  }

  getBlogDetails() {
    this.blogService.getBlogDetails(this.id).subscribe(response => {
      console.log(response.data);
    });

  
  }
}
