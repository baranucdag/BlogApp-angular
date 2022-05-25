import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogModel } from '../../../../core/models/blogModel';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../../../../core/services/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  selectedBlogId: number = 0;
  updateForm: FormGroup;
  pageNumber:number=1;
  pageSize:number=5;

  blogs: BlogModel[] = [];
  constructor(
    private blogService: BlogService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getBlogsPaginated(this.pageNumber,this.pageSize);
    this.blogUpdateForm();
  }

  blogUpdateForm() {
    if (
      this.selectedBlogId != null &&
      this.selectedBlogId != undefined &&
      this.selectedBlogId != 0
    ){
      this.blogService
        .getBlogById(this.selectedBlogId)
        .subscribe((response) => {
          const blogModel = <BlogModel>response.data;
          this.updateForm = this.formBuilder.group({
            id: blogModel.id,
            userId: blogModel.userId,
            createdAt: blogModel.createdAt,
            categoryId: [blogModel.categoryId,Validators.required],
            blogtitle: [blogModel.blogTitle,Validators.required],
            blogContent: [blogModel.blogContent,Validators.required],
          });
        });
    }
      
  }

  update() {
    let updatedModel: BlogModel = Object.assign({}, this.updateForm.value);
    this.blogService.updateBlog(updatedModel).subscribe(
      (response) => {
        this.toastr.info('Blog updated.');
      },
      (responseError) => {
        this.toastr.error("blog coulnd't updated!");
      }
    );
  }

  //get all blogs from database
  getBlogs() {
    this.blogService.getAll().subscribe((response) => {
     // this.blogs = response.data;
    });
  }

  //delete given blog
  delete(blogModel: BlogModel) {
    this.blogService.deleteBlog(blogModel).subscribe(
      (response) => {
        this.toastr.info('Blog Deleted!');
        this.getBlogs();
      },
      (errorResponse) => {
        this.toastr.error(errorResponse.message);
      }
    );
  }

  //change td colums to input colums when admin click to update button
  navigateEdit(blog: BlogModel) {
    this.selectedBlogId = blog.id;
  }

  //get blogs paginated on bakcend
  getBlogsPaginated(pageNumber:number,pageSize:number){
    this.blogService.getBlogsPaginated(pageNumber,pageSize).subscribe((response)=>{
      this.blogs=response;
      console.log(response)
    })
  }

  //increase the number of page
  increasePageNumber(){
    this.pageNumber+=1;
    this.getBlogsPaginated(this.pageNumber,this.pageSize);
  }

  //decrease the number of page
  decreasePageNumber(){
    if(this.pageNumber!=1){
      this.pageNumber-=1;
      this.getBlogsPaginated(this.pageNumber,this.pageSize);
    }
  }

  //set page number to given number
  setPageNumber(pageNumber:number){
    this.pageNumber=pageNumber;
    this.getBlogsPaginated(this.pageNumber,this.pageSize);
  }
}