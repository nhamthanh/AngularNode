import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  formData: Product;

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

  createProduct(product: Product){
    return this.firestore.collection('products').add(product);
  }

  login() {
    let user = {name: "admin"};
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return user;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}


