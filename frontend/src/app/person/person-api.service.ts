import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export type Person = {
  person_id: number;
  name: string;
  last_name: string;
  birth_date: Date;
};

@Injectable()
export class PersonApiService {
  httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/person';

  getPersons$() {
    return this.httpClient.get<Person[]>(this.baseUrl);
  }
}
