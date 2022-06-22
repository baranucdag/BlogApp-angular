import { CommentDetailModel } from './../../../core/models/commentDetailModel';
import { BlogModel } from 'src/app/core/models/blogModel';
import { UserModel } from '../../../core/models/userModel';
import { UserService } from '../../../core/services/user.service';
import { FavModel } from '../../../core/models/favModel';
import { FavService } from '../../../core/services/fav.service';
import { CommentModel } from '../../../core/models/commentModel';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../../../core/services/comment.service';
import { AuthService } from '../../../core/services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogDetailModel } from 'src/app/core/models/blogDetailModel';
import { BlogService } from 'src/app/core/services/blog.service';
import { DetailService } from 'src/app/core/services/detail.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  id: number = 0;
  blogDetail: BlogDetailModel;
  blog: BlogModel;
  comments: CommentDetailModel[] = [];
  favs: FavModel[] = [];
  commentPostForm: FormGroup;
  currentUserId: number;
  favCount: number;
  selectedFile = null;
  currentDate: Date;
  user: UserModel;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private detailService: DetailService,
    private commentService: CommentService,
    private favService: FavService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getParameter();
    this.isAuthor();
    this.getBlog();
    this.createPostCommentForm();
    this.getFavsByBlogId(this.id);
    this.getCommentsByBlogId(this.id);
    this.getFavCount();
    setInterval(() => {
      this.getFavCount();
    }, 100);
  }

  //get parametr 'id' and set it to id local variable
  getParameter() {
    this.route.params.subscribe((params) => {
      if (params !== null && params !== undefined) {
        this.id = Number(params['id']);
        if (this.authService.isAuthenticated()) {
          this.currentUserId = this.authService.currentUserId;
        }
        this.getBlogDetails();
        this.currentDate = new Date();
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
    this.commentService.getCommentDetailsByBlogId(id).subscribe(
      (response) => {
        this.comments = response.data;
      },
      (errorResponse) => {
        console.log('couldnt get data');
      }
    );
  }

  //get user by user id
  getUserById() {
    this.userService.getUserById(this.id).subscribe((response) => {
      this.user = response.data;
    });
  }

  //craete comment post form
  createPostCommentForm() {
    this.commentPostForm = this.formBuilder.group({
      commentContent: ['', Validators.required],
    });
  }

  //add comment
  addComment() {
    if (this.currentUserId != undefined && this.currentUserId != null) {
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
    } else
      this.toastr.error('If you want to leave a comment you have to login!');
  }

  //delete an comment
  deleteComment(id: number) {
    this.commentService.deleteCommentById(id).subscribe(
      (responnse) => {
        this.toastr.info('comment deleted succesfully!');
        this.getCommentsByBlogId(this.id);
      },
      (errorResponse) => {
        this.toastr.error('comment couldnt deleted!');
      }
    );
  }

  //check if current user is the owner of comment
  isCommentOwner(comment: CommentDetailModel) {
    if (this.currentUserId == comment.userId) {
      return true;
    }
    return false;
  }

  //get the fav count of blog
  getFavCount() {
    this.favService.getFavCount(this.id).subscribe((response) => {
      this.favCount = response.data;
    });
  }

  //add fav
  addFav() {
    if (this.currentUserId != undefined && this.currentUserId != null) {
      let favModel = {
        blogId: this.id,
        userId: this.currentUserId,
      };
      this.favService.addFav(favModel).subscribe(
        (reponse) => {
          this.toastr.info('You have just liked blog');
          this.getFavsByBlogId(this.id);
          this.checkIfLiked;
        },
        (errorResponse) => {
          this.toastr.error('Couldnt liked blog');
        }
      );
    }
    else this.toastr.error("If you want to like it you have to login!")
  }

  //delete fav (when stopping like)
  deleteFav() {
    let favDeleteModel = {
      blogId: this.id,
      userId: this.currentUserId,
    };
    this.favService.deleteById(favDeleteModel).subscribe(
      (response) => {
        this.toastr.info('Like deleted.');
        this.getFavsByBlogId(this.id);
        this.checkIfLiked;
      },
      (errorResponse) => {
        this.toastr.error('couldnt delete the fav');
      }
    );
  }

  //get all favs by blog id
  getFavsByBlogId(id: number) {
    this.favService.getFavsByBlogId(this.id).subscribe(
      (repsonse) => {
        this.favs = repsonse.data;
      },
      (errorResponse) => {
        this.toastr.error('Cannot get favs!');
      }
    );
  }

  //check if user already liked blog
  get checkIfLiked() {
    if (this.favs.find((x) => x.userId == this.currentUserId) != null) {
      return true;
    } else return false;
  }

  //get blog details
  getBlog() {
    this.blogService.getBlogById(this.id).subscribe((response) => {
      this.blog = response.data;
    });
  }

  //check if user is author of the blog
  isAuthor() {
    if (this.blog) {
      if (this.currentUserId == this.blog.userId) {
        return true;
      }
      return false;
    }
    return;
  }
}
