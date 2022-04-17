import { ImageService } from './../../services/image.service';
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
  blogId: number;
  blogCount: number = 6;
  blogHeader?: string;
  backGroundImage: '(assets/images/post-bg.jpg)';
  blogImagePath: string;
  constructor(
    private blogService: BlogService,
    private detailService: DetailService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.detailService.blogDetail.subscribe((detail) => {
      if (detail) {
        this.blogHeader = detail.blogTitle;
        this.blogId = detail.blogId;
      }
    });

    if(this.blogId){
      this.getBackground(this.blogId);
    }else{
      this.blogImagePath=this.backGroundImage;
      console.log('hata mesajı')
    }

  }
  //task::eğer default image dönerse blog uygulamasının image ini göster 
  getBackground(id:number) {
    return this.imageService.getByBlogId(id).subscribe((response=>{
      console.log(response.data.imagePath)
      this.blogImagePath = response.data.imagePath;
    }))
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
