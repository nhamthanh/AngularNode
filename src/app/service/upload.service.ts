import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = '/uploads';

  constructor() { }

  getFile() {
    return 'file test';
  }
}
