import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'firebase/firestore';
import 'firebase/storage';
import { CategoryComponent } from './category/category.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './template/header/header.component';
import { CustomMaterialModule } from './core/material.module';
import { AuthenticateService } from './service/authenticate.service';
import { AngularFireAuth } from '@angular/fire/auth';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    LoginComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    LoginComponent, ProductComponent
  ],
  providers: [AngularFirestore, AngularFireStorage, AuthenticateService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
