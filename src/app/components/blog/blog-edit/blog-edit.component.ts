import { BlogDetailModel } from 'src/app/models/blogDetailModel';
import { ActivatedRoute } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { BlogModel } from 'src/app/models/blogModel';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css'],
})
export class BlogEditComponent implements OnInit {
  blogEditForm: FormGroup;
  blogModel: BlogModel;
  id: number = 7;
  categoryId: number;
  blogTitle: string;
  blogContent: string;
  constructor(
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.getBlogById();
  }

  ngOnInit(): void {
    this.getParam();
  }

  getParam() {
    this.route.params.subscribe((params) => {
      if (params !== null && params !== undefined) {
        this.id = Number(params['id']);
      }
    });
  }

  getBlogById() {
    this.blogService.getBlogDetails(7).subscribe((response) => {
      console.log(response.message);
      const blogModel = <BlogDetailModel>response.data;
      this.blogEditForm = this.formBuilder.group({
        categoryName: [blogModel.categoryName, Validators.required],
        blogTitle: [blogModel.blogTitle, Validators.required],
        blogContent: [blogModel.blogContent, Validators.required],
      });
    });
  }
}
