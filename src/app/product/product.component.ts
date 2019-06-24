import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { NgForm } from '@angular/forms';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  currentUser: any;
  categories: Category[];
  constructor(public productService: ProductService, public categoryService: CategoryService) {
    if (this.productService.currentUserValue) {
      this.productService.currentUser.subscribe(x => this.currentUser = x);
    }
  }

  ngOnInit() {
    this.resetForm();
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Category;
      })
    });
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.productService.formData = {
      id: null,
      name: '',
      price: '',
      category: '',
      discount: ''
    }
  }

  categoryChange(form: NgForm, value) {
    form.value.category = value;
  }

  onSubmit(form: NgForm) {
    let product = Object.assign({}, form.value);
    delete product.id;
    if (form.value.id == null) {
      this.productService.createProduct(product);
    } else {
      //this.productService.updateProduct(product);
    }
    this.resetForm(form);
  }

  create(product: Product){
      this.productService.createProduct(product);
  }
}
