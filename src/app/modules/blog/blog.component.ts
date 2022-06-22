import { AuthService } from 'src/app/core/services/auth.service';
import { ImageService } from '../../core/services/image.service';
import { DetailService } from '../../core/services/detail.service';
import { BlogModel } from 'src/app/core/models/blogModel';
import { BlogService } from '../../core/services/blog.service';
import { Component, OnInit } from '@angular/core';
import {ChangeDetectorRef } from '@angular/core';

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
  imageDirectoryPath: any;
  constructor(
    private blogService: BlogService,
    private detailService: DetailService,
    private imageService: ImageService,
    private cdref: ChangeDetectorRef,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.authService.setUserStats()
    console.log(this.authService.currentRoles)
    this.detailService.blogDetail.subscribe((detail) => {
      if (detail && detail.blogId) {
        this.blogHeader = detail.blogTitle;
        this.blogId = detail.blogId;
        this.getBackground(this.blogId);
      }else{
        this.imageDirectoryPath = 'assets/images/cover.jpg';
        this.blogHeader='Spaced Blog'
        this.cdref.detectChanges();   //to avoid 'Expression has changed after it was checked' error.
      }
    });
  }

  getBackground(id: number) {
    if (this.blogId != null && this.blogId != undefined) {
      return this.blogService.getBlogById(id).subscribe((response) => {
        this.imageDirectoryPath =
          'https://localhost:44313/uploads/images/' + response.data.imagePath;
      });
    } else {
      return (this.imageDirectoryPath = 'assets/images/post-bg.jpg');
    }
  }

  //get all blogs
  getAllBlogs() {
    this.blogService.getAll().subscribe((response) => {
      this.blogs = response.data;
    });
  }

  //increase number of blog on main page
  riseCountOfBlog() {
    this.blogCount = this.blogCount + 5;
  }
}
