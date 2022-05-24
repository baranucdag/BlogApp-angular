import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
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

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.createCategoryForm()
    }

  //get all categories
  getCategories() {
    this.categoryService.getAllCategories().subscribe((response) => {
      this.categories = response.data;
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
        this.getCategories();
      },
      (errorResponse)=>{
        this.toastr.error('Category couldnt added!')
      });
    }
  }

  //delete a category
  deleteCategory(category:CategoryModel){
    this.categoryService.deleteCategory(category).subscribe((response)=>{
      this.toastr.info('Category deleted!');
      this.getCategories();
    },(errorResponse)=>{
      this.toastr.error('Category couldnt deleted!')
    })
  }
}
