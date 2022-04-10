import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {
  blogAddForm: FormGroup;
  constructor(
    private blogService: BlogService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createBlogAddForm();
  }

  createBlogAddForm() {
    this.blogAddForm = this.formBuilder.group({
      userId: ['', Validators.required],
      categoryId: ['', Validators.required],
      blogTitle: ['', Validators.required],
      blogContent: ['', Validators.required],
      likedCount: [''],
    });
  }

  addBlog() {
    if (this.blogAddForm.valid) {
      let blogModel = Object.assign({}, this.blogAddForm.value);
      this.blogService.addBlog(blogModel).subscribe(response=>{
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
