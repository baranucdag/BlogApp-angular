import { CategoryService } from './../../../core/services/category.service';
import { CategoryModel } from './../../../core/models/categoryModel';
import { AuthService } from '../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css'],
})
export class BlogAddComponent implements OnInit {
  blogAddForm: FormGroup;
  currentUserId: number;
  selectedFile=null;
  categories: CategoryModel[] = [];

  constructor(
    private blogService: BlogService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.createBlogAddForm();
    this.getCategories();
  }

  createBlogAddForm() {
    this.blogAddForm = this.formBuilder.group({
      userId: this.currentUserId,
      categoryId: ['', Validators.required],
      blogTitle: ['', Validators.required],
      blogContent: ['', Validators.required],
    });
  }

  //add blog
  addBlog() {
    if (this.blogAddForm.valid) {
      let blogModel = Object.assign({}, this.blogAddForm.value);
      this.blogService.addBlog(blogModel).subscribe(
        (response) => {
          this.toastService.info('Blog added succesfully');
        },
        (responseError) => {
          this.toastService.error('Blog Couldnt added');
        }
      );
    } else {
      this.toastService.error('Form is invalid');
    }
  }

  //get current user from auth service
  getCurrentUser() {
    this.currentUserId = this.authService.getCurrentUserId();
  }

  //get categories
  getCategories() {
    this.categoryService.getAllCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }
}
