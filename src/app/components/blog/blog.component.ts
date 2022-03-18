import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blogModel';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs:Blog[]=[];

  constructor(private blogService:BlogService) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(){
    this.blogService.getAll().subscribe(response=>{
     this.blogs= response.data
    })
  }
}
