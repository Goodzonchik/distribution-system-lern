import { Controller, Get } from '@nestjs/common';
import { PersonService } from './person.service.js';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  getPersons(): Observable<any> | Promise<any> {
    return this.personService.findAll();
  }
}
