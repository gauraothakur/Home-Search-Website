import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const URL = 'http://localhost:3000/api/file/';
@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  private uploader: FileUploader
  constructor(private http: HttpClient) {
    this.uploader = new FileUploader({ url: URL, itemAlias: 'photo' });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }
  public getUploader(): FileUploader {
    return this.uploader;
  }
}
