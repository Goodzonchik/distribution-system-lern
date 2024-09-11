import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class UsersApiService {
  httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/users';

  getUsers$() {
    return this.httpClient.get<any>(this.baseUrl);
  }

  setUsersRelationship$(from: string, to: string, relationship: string) {
    return this.httpClient.post<void>(`${this.baseUrl}/create-relationship`, {
      nameFrom: from,
      nameTo: to,
      relationship,
    });
  }

  createUsers$(
    type: string,
    propName: string,
    propValue: string,
    label: string
  ) {
    return this.httpClient.post<void>(this.baseUrl, {
      uid: 'u',
      type,
      propName,
      propValue,
      label,
    });
  }

  deleteUser$(name: string) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${name}`);
  }
}
