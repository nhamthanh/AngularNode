import { Component, OnInit } from '@angular/core';
import { Product } from './product/product.model';
import { ProductService } from './product/product.service';
import { Router } from '@angular/router';
import { CategoryService } from './category/category.service';
import { Category } from './category/category';
import * as firebase from 'firebase';
import { AuthenticateService } from './service/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularNode';
  currentUser = firebase.auth().currentUser;
  products: Product[];
  categories: Category[];
  constructor(private productService: ProductService,
              private auth: AuthenticateService,
              private categoryService: CategoryService,
              private route: Router) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Product;
      });
    });
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Category;
      });
    });
  }

  // login() {
  //   this.productService.login();
  //   if (this.productService.currentUserValue) {
  //     this.productService.currentUser.subscribe(x => this.currentUser = x);
  //   }
  //   this.route.navigate(['/product']);
  // }

}
