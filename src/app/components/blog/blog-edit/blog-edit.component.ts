import { BlogModel } from './../../../models/blogModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

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
  constructor(
    private blogService: BlogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private toasrt: ToastrService
  ) {
    this.getBlogById(7);
  }

  ngOnInit(): void {
    this.getParam();
    this.getBlogById(this.id);
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
        const blogModel = <BlogModel>response.data;
        this.blogEditForm = this.formBuilder.group({
          id: blogModel.id,
          createdAt: blogModel.createdAt,
          userId: blogModel.userId,
          likedCount: blogModel.likedCount,
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

  //refresh location
  refresh(): void {
    window.location.reload();
  }

  //update blog
  update() {
    if (this.blogEditForm.valid) {
      let updatedModel: BlogModel = Object.assign({}, this.blogEditForm.value);
      this.blogService.updateBlog(updatedModel).subscribe(
        (response) => {
          this.toasrt.info('Blog updated succesfully!', updatedModel.blogTitle);
          this.router.navigate(['/blog/detail/'+updatedModel.id])
        },
        (responseError) => {
          this.toasrt.error("Blog couldn't updated!");
        }
      );
    }
  }
}
