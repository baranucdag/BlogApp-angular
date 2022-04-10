import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogDetailModel } from 'src/app/models/blogDetailModel';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  id: number = 0;
  blogDetail:BlogDetailModel;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.getParameter();
    
  }

  //get parametr 'id' and set it to id local variable
  getParameter() {
    this.route.params.subscribe((params) => {
      if (params !== null && params !== undefined) {
        this.id = Number(params['id']);
        this.getBlogDetails();
        console.log(params['id'])
      }
    });
  }
 
  //get blog details by id variable (from route)
  getBlogDetails() {
    this.blogService.getBlogDetails(this.id).subscribe(response => {
      this.blogDetail=response.data;
    });
  }

}
