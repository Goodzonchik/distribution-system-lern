import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable, tap } from 'rxjs';

@Injectable()
export class FilesApiService {
  httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/Buckets/file';

  getFile$(name: string) {
    return this.httpClient
      .get(`${this.baseUrl}/${name}`, {
        responseType: 'blob',
      })
      .pipe(
        tap((res) => {
          console.log('download');

          saveAs(res as unknown as Blob, name);
        })
      );
  }

  postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('filename', fileToUpload.name);

    return this.httpClient.post(
      'http://localhost:3000/api/Buckets/upload',
      formData
    );
  }
}
