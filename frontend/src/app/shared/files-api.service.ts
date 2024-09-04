import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable, tap } from 'rxjs';

@Injectable()
export class FilesApiService {
  httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/Buckets';

  getFile$(name: string) {
    return this.httpClient
      .get(`${this.baseUrl}/file/${name}`, {
        responseType: 'blob',
      })
      .pipe(
        tap((res) => {
          saveAs(res as unknown as Blob, name);
        })
      );
  }

  postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('filename', fileToUpload.name);

    return this.httpClient.post(`${this.baseUrl}/upload`, formData);
  }
}
