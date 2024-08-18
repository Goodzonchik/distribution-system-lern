import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class UsersApiService {
  httpClient = inject(HttpClient);

  getUsers$() {
    return this.httpClient.get<any>('http://localhost:3000/api/users');
  }
}
