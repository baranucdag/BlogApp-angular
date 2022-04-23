import { AuthService } from './../../services/auth.service';
import { ImageService } from './../../services/image.service';
import { DetailService } from './../../services/detail.service';
import { BlogModel } from 'src/app/models/blogModel';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';

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
  backGroundImage = 'assets/images/post-bg.jpg';
  imageDirectoryPath: any;
  constructor(
    private blogService: BlogService,
    private detailService: DetailService,
    private imageService: ImageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserRoles();
    this.detailService.blogDetail.subscribe((detail) => {
      if (detail && detail.blogId) {
        this.blogHeader = detail.blogTitle;
        this.blogId = detail.blogId;
        this.getBackground(this.blogId);
      }
    });
  }

  //task:eğer default image dönerse blog uygulamasının image ini göster
  getBackground(id: number) {
    if(this.blogId!=null && this.blogId!=undefined){
      return this.imageService.getByBlogId(id).subscribe((response) => {
        console.log(response.data.imagePath);
        this.imageDirectoryPath =
          'https://localhost:44313/uploads/images/'+response.data.imagePath;
        console.log(this.imageDirectoryPath);
      });
    }
    else{
     return this.imageDirectoryPath = 'assets/images/post-bg.jpg';
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

  getUserRoles() {
    console.log(this.authService.currentRoles);
  }
}
