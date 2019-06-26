import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = '/uploads';
 
  constructor(private afStorage: AngularFireStorage) { }
 

}
