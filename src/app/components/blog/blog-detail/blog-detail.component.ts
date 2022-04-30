import { CommentModel } from './../../../models/commentModel';
import { SingleResponseModel } from './../../../models/singleResponseModel';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from './../../../services/comment.service';
import { AuthService } from './../../../services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogDetailModel } from 'src/app/models/blogDetailModel';
import { BlogService } from 'src/app/services/blog.service';
import { DetailService } from 'src/app/services/detail.service';
import { param } from 'jquery';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  id: number = 0;
  blogDetail: BlogDetailModel;
  comments: CommentModel[] = [];
  commentPostForm: FormGroup;
  currentUserId: number;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private detailService: DetailService,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getParameter();
    this.createPostCommentForm();
    this.getCommentsByBlogId(this.id);
  }

  //get parametr 'id' and set it to id local variable
  getParameter() {
    this.route.params.subscribe((params) => {
      if (params !== null && params !== undefined) {
        this.id = Number(params['id']);
        this.currentUserId = this.authService.getCurrentUserId();
        this.getBlogDetails();
      }
    });
  }

  //get blog details by id variable (from route)
  getBlogDetails() {
    if (this.id == undefined && this.id == null) {
      return;
    }
    this.blogService.getBlogDetails(this.id).subscribe((response) => {
      this.blogDetail = response.data;
      this.detailService.blogDetail.next(response.data);
    });
  }

  //get comments by blog id
  getCommentsByBlogId(id: number) {
    this.commentService.getByBlogId(id).subscribe(
      (response) => {
        this.comments = response.data;
      },
      (errorResponse) => {
        console.log('couldnt get data');
      }
    );
  }

  //craete comment post form
  createPostCommentForm() {
    this.commentPostForm = this.formBuilder.group({
      commentContent: ['', Validators.required],
    });
  }

  //add comment
  addComment() {
    if(this.currentUserId!=undefined && this.currentUserId!=null){
      if (this.commentPostForm.valid) {
        let formcommentContent: CommentModel = Object.assign(
          {},
          this.commentPostForm.value
        );
        let commentPostModel = {
          userId: this.currentUserId,
          blogId: this.id,
          commentContent: formcommentContent.commentContent,
        };
        this.commentService.addComment(commentPostModel).subscribe(
          (response) => {
            this.toastr.info('Comment posted succesfully!');
            this.getCommentsByBlogId(this.id);
          },
          (errorResponse) => {
            this.toastr.error('comment couldnt posted!');
          }
        );
      } else {
        this.toastr.error('comment content cannot be empty!');
      }
    }
    else this.toastr.error('If you want to leave a comment you have to login!')
  }

  //delete an comment
  deleteComment(deleteModel: CommentModel) {
    this.commentService.deleteComment(deleteModel).subscribe(
      (responnse) => {
        this.toastr.info('comment deleted succesfully!');
        this.getCommentsByBlogId(this.id);
      },
      (errorResponse) => {
        this.toastr.error('comment couldnt deleted!');
      }
    );
  }

  isCommentOwner(comment: CommentModel) {
    if (this.currentUserId == comment.userId) {
      return true;
    } else return false;
  }
}
