import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class UsersApiService {
  httpClient = inject(HttpClient);

  getUsers$() {
    return this.httpClient.get<any>('http://localhost:3000/api/users');
  }

  setUsersRelationship$(from: string, to: string, relationship: string) {
    return this.httpClient.post<void>(
      'http://localhost:3000/api/users/create-relationship',
      {
        nameFrom: from,
        nameTo: to,
        relationship,
      }
    );
  }

  createUsers$(type: string, propName: string, propValue: string) {
    return this.httpClient.post<void>('http://localhost:3000/api/users', {
      uid: 'u',
      type,
      propName,
      propValue,
    });
  }
}
