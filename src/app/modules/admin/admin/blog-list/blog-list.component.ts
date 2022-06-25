import { ResponseModel } from './../../../../core/models/responseModel';
import { BlogDetailModel } from './../../../../core/models/blogDetailModel';
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
  pageNumber: number = 1;
  selectedBlogId: number = 0;
  pageSize: number = 4;
  baran: string;
  blogTitle: string;
  selectedBlog?: BlogDetailModel;
  blogContent: string;
  categoryId: any;
  blogDetails:BlogDetailModel[]=[];
  totalData:number=0;

  blogs: BlogModel[] = [];
  constructor(
    private blogService: BlogService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getBlogDetails(this.pageNumber,this.pageSize)
  }
  update() {
    let model = {...this.selectedBlog,blogTitle:this.blogTitle,blogContent:this.blogContent};
    console.log(model)
    const updatedModel = new FormData();
    updatedModel.append('Id', JSON.stringify(model.blogId));
    updatedModel.append('UserId', JSON.stringify(model.userId));
    updatedModel.append('CategoryId', JSON.stringify(model.categoryId));
    updatedModel.append('BlogTitle', model.blogTitle);
    updatedModel.append('BlogContent', model.blogContent);
    console.log(updatedModel)
    this.blogService.updateBlog(updatedModel).subscribe(
      (response) => {
        this.toastr.info('Blog updated.');
        this.selectedBlogId = 0;
        this.getBlogDetails(this.pageNumber,this.pageSize);
      },
      (responseError) => {
        this.toastr.error("blog coulnd't updated!");
      }
    );
  }

  //get blog details from service (model is detail not standart model)
  getBlogDetails(pageNumber:number,pageSize:number){
    this.blogService.getAllDetails(pageNumber,pageSize).subscribe((response)=>{
      this.blogDetails = response.data;
      this.totalData = response.data.length;
    })
  }

  //delete given blog
  delete(blogModel:any) {
    let deleteModel:BlogModel = {
      id:blogModel.blogId,
      categoryId:blogModel.categoryId,
      userId:blogModel.userId,
      blogTitle:blogModel.blogTitle,
      blogContent:blogModel.blogContent,
      createdAt:blogModel.createdAt,
      imagePath:blogModel.imagePath
    }
    this.blogService.deleteBlog(deleteModel).subscribe(
      (response) => {
        this.toastr.info(response.message);
        console.log(response)
        this.getBlogDetails(this.pageNumber,this.pageSize);
      },
      (errorResponse) => {
        this.toastr.error(errorResponse.error.message);
        console.log(errorResponse)
      }
    );
  }

  //change td colums to input colums when admin click to update button
  navigateEdit(blog: BlogDetailModel) {
    this.selectedBlog = blog;
    console.log(blog)
    this.blogTitle = blog.blogTitle;
    this.blogContent = blog.blogContent;
    this.selectedBlogId=blog.blogId
  }

  //increase the number of page
  increasePageNumber() {
    this.pageNumber += 1;
    this.getBlogDetails(this.pageNumber, this.pageSize);
  }

  //decrease the number of page
  decreasePageNumber() {
    if (this.pageNumber != 1) {
      this.pageNumber -= 1;
      this.getBlogDetails(this.pageNumber, this.pageSize);
    }
  }

  //set page number to given number
  setPageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getBlogDetails(this.pageNumber, this.pageSize);
  }

    //check data amount to disabe 'see more blog' button
    checkDataAmount(){
      if(this.totalData % 4 !=0){
        return false
      } return true
    }
}
