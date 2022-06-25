import { CategoryModel } from './../../../core/models/categoryModel';
import { CategoryService } from './../../../core/services/category.service';
import { BlogModel } from '../../../core/models/blogModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent implements OnInit {
  blogEditForm: FormGroup;
  id: number;
  categoryId: number;
  blogTitle: string;
  blogContent: string;
  categories: CategoryModel[];
  imagePath: string = 'https://localhost:44313/uploads/images/';
  selectedFile: File;
  currentImage: any;

  constructor(
    private blogService: BlogService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toasrt: ToastrService
  ) {}

  ngOnInit(): void {
    this.getParam();
    this.getBlogById(this.id);
    this.getCategories();
  }

  getParam() {
    this.route.params.subscribe((params) => {
      if (params !== null && params !== undefined) {
        this.id = Number(params['id']);
      }
    });
  }

  getBlogById(id: number) {
    this.blogService.getBlogById(id).subscribe(
      (response) => {
        if (response.data.imagePath) {
          this.imagePath = this.imagePath + response.data.imagePath;
          this.currentImage = response.data.imagePath;
        }
        const blogModel = <BlogModel>response.data;
        this.blogEditForm = this.formBuilder.group({
          id: blogModel.id,
          createdAt: blogModel.createdAt,
          userId: blogModel.userId,
          categoryId: [blogModel.categoryId, Validators.required],
          blogTitle: [blogModel.blogTitle, Validators.required],
          blogContent: [blogModel.blogContent, Validators.required],
        });
      },
      (responseError) => {
        this.toasrt.error('There is a problem about blog');
      }
    );
  }

  //update blog
  update() {
    if (this.blogEditForm.valid) {
      let updatedModel: BlogModel = Object.assign({}, this.blogEditForm.value);
      console.log(this.selectedFile);
      const sendForm = new FormData();
      sendForm.append('Id', JSON.stringify(this.id));
      sendForm.append('UserId', JSON.stringify(updatedModel.userId));
      sendForm.append('CategoryId', JSON.stringify(updatedModel.categoryId));
      sendForm.append('BlogTitle', updatedModel.blogTitle);
      sendForm.append('BlogContent', updatedModel.blogContent);
      sendForm.append('Image', this.selectedFile);
      this.blogService.updateBlog(sendForm).subscribe(
        (response) => {
          this.toasrt.info('Blog updated succesfully!', updatedModel.blogTitle);
          this.router.navigate(['/detail/' + this.id]);
        },
        (responseError) => {
          this.toasrt.error("Blog couldn't updated!");
        }
      );
    }
  }

  //get categories from service
  getCategories() {
    this.categoryService.getAll().subscribe((response) => {
      this.categories = response.data;
    });
  }

  //get selected file(image)
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
}
