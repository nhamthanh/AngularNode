import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { NgForm } from '@angular/forms';
import { Category } from '../category/category';
import { CategoryService } from '../category/category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
  constructor(public productService: ProductService, public categoryService: CategoryService, private storage: AngularFireStorage) {
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
    }
  }

  categoryChange(form: NgForm, value) {
    form.value.category = value;
  }

  onSubmit(form: NgForm) {
    let product = Object.assign({}, form.value);
    this.downloadURL.subscribe(x => {product.image = x;
        delete product.id;
        if (form.value.id == null) {
          this.productService.createProduct(product);
        } else {
          //this.productService.updateProduct(product);
        }
        this.resetForm(form);
      }
    );
  }

  create(product: Product){
      this.productService.createProduct(product);
  }
}
