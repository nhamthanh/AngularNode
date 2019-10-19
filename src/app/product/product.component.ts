import { Component, OnInit, Inject } from '@angular/core';
import { ProductModel } from './ProductModel';
import { ProductService } from './product.service';
import { NgForm } from '@angular/forms';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  currentUser: any;
  categories: Category[];
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(public dialogRef: MatDialogRef<ProductComponent>,
              public productService: ProductService,
              public categoryService: CategoryService,
              @Inject(MAT_DIALOG_DATA) public data: ProductModel,
              private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.resetForm();
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Category;
      });
    });
    this.productService.formData = {
      id: this.data.id,
      name: this.data.name,
      price: this.data.price,
      category: this.data.category,
      discount: this.data.discount,
      image: this.data.image
    };
    this.downloadURL = of(this.data.image);
  }

  upload(form: NgForm, event) {
    const file = event.target.files[0];
    const filePath = 'upload/' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
      })
    )
    .subscribe();
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
      discount: '',
      image: ''
    };
  }

  categoryChange(form: NgForm, value) {
    form.value.category = value;
  }

  // onSubmit(form: NgForm) {
  //   const product = Object.assign({}, form.value);
  //   // tslint:disable: align
  //   if (!this.downloadURL) {
  //     if (form.value.id == null) {
  //       this.productService.createProduct(product);
  //     } else {
  //       //this.productService.updateProduct(product);
  //     }
  //   } else {
  //     this.downloadURL.subscribe(x => {
  //         product.image = x;
  //         delete product.id;
  //         if (form.value.id == null) {
  //           this.productService.createProduct(product);
  //         } else {
  //           //this.productService.updateProduct(product);
  //         }
  //       }
  //     );
  //   }
  //   this.resetForm(form);
  // }

  onClick(form: NgForm) {
    const product = Object.assign({}, form.value);
    // tslint:disable: align
    if (!this.downloadURL) {
      if (form.value.id == null) {
        this.productService.createProduct(product);
      } else {
        this.productService.updateProduct(product.id, product);
      }
    } else {
      this.downloadURL.subscribe(x => {
          product.image = x;
          delete product.id;
          if (form.value.id == null) {
            this.productService.createProduct(product);
          } else {
            this.productService.updateProduct(product.id, product);
          }
        }
      );
    }
  }

  create(product: ProductModel){
      this.productService.createProduct(product);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
