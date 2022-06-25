import { Router } from '@angular/router';
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
  selectedFile: File;
  categories: CategoryModel[] = [];
  imagePath: string = 'https://localhost:44313/uploads/images/DefaultImage.jpg';

  constructor(
    private blogService: BlogService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.createBlogAddForm();
    this.getCategories();
    this.checkIfValid();
  }

  createBlogAddForm() {
    this.blogAddForm = this.formBuilder.group({
      userId: this.currentUserId,
      categoryId: ['', Validators.required],
      blogTitle: ['', [Validators.required, Validators.minLength(30),Validators.maxLength(400)]],
      blogContent:['', [Validators.required, Validators.minLength(45),Validators.maxLength(2500)]]
    });
  }

  //add blog
  addBlog() {
    if (this.blogAddForm.valid) {
      let blogModel = Object.assign({}, this.blogAddForm.value);
      const sendForm = new FormData();
      sendForm.append('UserId', JSON.stringify(blogModel.userId));
      sendForm.append('CategoryId', JSON.stringify(blogModel.categoryId));
      sendForm.append('BlogTitle', blogModel.blogTitle);
      sendForm.append('BlogContent', blogModel.blogContent);
      sendForm.append('Image', this.selectedFile);
      this.blogService.addBlog(sendForm).subscribe(
        (response) => {
          this.toastService.info(response.message);
          this.router.navigate(['']);
        },
        (responseError) => {
          console.log(sendForm);
          this.toastService.error('Blog Couldnt added');
        }
      );
    } else {
      this.toastService.error('Form is invalid');
    }
  }

  //get current user from auth service
  getCurrentUser() {
    this.currentUserId = this.authService.currentUserId;
  }

  //get categories
  getCategories() {
    this.categoryService.getAll().subscribe((response) => {
      this.categories = response.data;
    });
  }

  onFileSelected(event: any) {
    if (event) {
      this.selectedFile = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imagePath = event.target.result;
      };
    }
  }

  checkIfValid() {
    if (this.blogAddForm.valid) {
      return true;
    } else return false;
  }
}
