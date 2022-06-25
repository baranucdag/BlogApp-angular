import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../../../core/services/category.service';
import { CategoryModel } from './../../../../core/models/categoryModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {

  categories: CategoryModel[] = [];
  addFrom:FormGroup
  pageNumber:number=1;
  pageSize:number=7;
  totalData:number=0;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategories(this.pageNumber,this.pageSize);
    this.createCategoryForm()
    }

  //get all categories
  getCategories(pageNumber:number,pageSize:number) {
    this.categoryService.getAllCategories(pageNumber,pageSize).subscribe((response) => {
      this.categories = response.data;
      this.totalData = response.data.length
    });
  }

  //create category form
  createCategoryForm(){
    this.addFrom = this.formBuilder.group({
      categoryName:['',Validators.required]
    })
  }

  //add a category
  addCategory() {
    if(this.addFrom.valid){
      let categoryName =  Object.assign({},this.addFrom.value)
      this.categoryService.addCategory(categoryName).subscribe((response) => {
        this.toastr.info('Category added!')
        this.getCategories(this.pageNumber,this.pageSize);
      },
      (errorResponse)=>{
        this.toastr.error('Category couldnt added!')
      });
    }
  }

  //delete a category
  deleteCategory(category:CategoryModel){
    this.categoryService.deleteCategory(category).subscribe((response)=>{
      this.toastr.info(response.message);
      console.log(response)
      this.getCategories(this.pageNumber,this.pageSize);
    },(errorResponse)=>{
      this.toastr.error(errorResponse.error.message)
    })
  }

  //increase the number of page
  increasePageNumber(){
    this.pageNumber+=1;
    this.getCategories(this.pageNumber,this.pageSize);
  }

  //decrease the number of page
  decreasePageNumber(){
    if(this.pageNumber!=1){
      this.pageNumber-=1;
      this.getCategories(this.pageNumber,this.pageSize);
    }
  }

  //set page number to given number
  setPageNumber(pageNumber:number){
    this.pageNumber=pageNumber;
    this.getCategories(this.pageNumber,this.pageSize);
  }

    //check data amount to disabe 'see more blog' button
    checkDataAmount(){
      if(this.totalData % 7 !=0 || this.totalData == 7 || this.totalData == 14){
        return false
      } return true
    }
}
