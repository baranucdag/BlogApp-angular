import { SingleResponseModel } from './../../models/singleResponseModel';
import { UserModel } from './../../models/userModel';
import { UserService } from './../../services/user.service';
import { BlogModel } from 'src/app/models/blogModel';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { BlogDetailModel } from 'src/app/models/blogDetailModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogs: BlogModel[] = [];
  blogDetails: BlogDetailModel[] = [];
  currentUser: UserModel;

  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.blogService.getAll().subscribe((response) => {
      this.blogs = response.data;
    });
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe((response) => {
      this.currentUser = response.data;
    });
  }

  onSelect(id: number) {
    this.router.navigate(['blog/detail/' + id]);
  }

  getAllPost(par: boolean) {
    if (par) {
      return "i<5";
    } else return;
  }
}
