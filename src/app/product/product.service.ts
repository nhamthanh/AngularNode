import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductModel } from './ProductModel';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  formData: ProductModel;

  constructor(private firestore: AngularFirestore) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  persistProduct(product: ProductModel) {
    if (!product.image) {
      delete product.image;
    }
    if (product.id) {
      return this.firestore.collection('products').doc(product.id).set(product);
    } else {
      return this.firestore.collection('products').add(product);
    }
  }

  deleteProduct(id) {
    return this.firestore.collection('products').doc(id).delete();
  }

  // login() {
  //   let user = {name: "admin"};
  //   localStorage.setItem('currentUser', JSON.stringify(user));
  //   this.currentUserSubject.next(user);
  //   return user;
  // }

  // logout() {
  //   localStorage.removeItem('currentUser');
  //   this.currentUserSubject.next(null);
  // }

}


