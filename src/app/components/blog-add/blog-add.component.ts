import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { BlogModel } from 'src/app/models/blogModel';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css'],
})
export class BlogAddComponent implements OnInit {
  blogAddForm: FormGroup;
  constructor(
    private blogService: BlogService,
    private toastService: ToastrService,
    private FormBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createBlogAddForm();
  }

  createBlogAddForm() {
    this.blogAddForm = this.FormBuilder.group({
      userId: ['', Validators.required],
      categoryId: ['', Validators.required],
      blogTitle: ['', Validators.required],
      blogContent: ['', Validators.required],
      likedCount: [''],
    });
  }

  addBlog() {
    if (this.blogAddForm.valid) {
      console.log(this.blogAddForm.value);
      let blogModel = Object.assign({}, this.blogAddForm.value);
      this.blogService.postBlog(blogModel).subscribe(response=>{
        this.toastService.info("Blog added succesfully")
      },
      responseError=>{
        this.toastService.error("Blog Couldnt added")
      })
    }
    else{
      this.toastService.error("Form is invalid")
    }
  }
}
