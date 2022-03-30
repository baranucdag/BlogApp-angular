import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.css'],
})

//sorunlar:o andaki componente göre title ve image i ayarlama
export class MastheadComponent implements OnInit {
  header: string = '';
  blogId: number = 0;
  isNavigationDetail: boolean = false;
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,private router:Router
  ) {}

  ngOnInit(): void {
    this.getBlogId();
    this.getCurrentComponents();
  }

  //get blog id from url path
  getBlogId() {
    this.route.params.subscribe((params) => {
      if (params !== null && params !== undefined) {
        this.blogId = Number(params['id']);
      }
    });
  }

  //get blog id by route
  getBlogTitle() {
    this.blogService.getBlogDetails(this.blogId).subscribe((response) => {
      this.header = response.data.blogTitle;
    });
  }
  //doesnt work!
  //check current component, print title if current component is detail otherwise print Blog Application
  setBlogTitle() {
    if ((this.isNavigationDetail = true)) {
      this.getBlogTitle();
    } else {
      this.header = 'Blog Application';
    }
  }

  getCurrentComponents(){
    if(this.router.url.includes('detail')){
      console.log(this.router.url);
    }

  }
}
