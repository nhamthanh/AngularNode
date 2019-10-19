import { Component, OnInit } from '@angular/core';

import { ProductService } from './product/product.service';
import { Router } from '@angular/router';
import { CategoryService } from './category/category.service';
import { Category } from './category/category';
import * as firebase from 'firebase';
import { AuthenticateService } from './service/authenticate.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductComponent } from './product/product.component';
import { ProductModel } from './product/ProductModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularNode';
  currentUser = firebase.auth().currentUser;
  products: ProductModel[];
  categories: Category[];
  constructor(private dialog: MatDialog,
              private productService: ProductService,
              private auth: AuthenticateService,
              private categoryService: CategoryService,
              private route: Router) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as ProductModel;
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

  productDialog(product): void {
    const dialogRef = this.dialog.open(ProductComponent, {
      width: '800px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  delete(product) {
    this.productService.deleteProduct(product.id);
  }
}
