import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.css'],
})
export class MastheadComponent implements OnInit {
  header: string='';
  blogId: number=5;
  isNavigationDetail:boolean=false;
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute
    ,private router:Router
  ) {}

  ngOnInit(): void {
    this.setBlogTitle();
  }

  getBlogId(){
    this.route.params.subscribe(params=>{
      if(params!==null && params!==undefined){
        this.blogId = Number(params['id']);
        this.isNavigationDetail=true;
        console.log(this.blogId);
      }
    })
  }

  getBlogTitle() {
    this.blogService.getBlogDetails(this.blogId).subscribe(response => {
      console.log(response.message);
      this.header=response.data.blogTitle;
      this.getBlogId();
    });
  }

  setBlogTitle(){
    if(this.isNavigationDetail=true){
      this.getBlogTitle();
    }
    else{
      this.header='Blog Application';
    }
  }
}

