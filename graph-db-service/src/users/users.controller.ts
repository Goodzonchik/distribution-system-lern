import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Observable } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  getData(): Observable<any> {
    return this.UsersService.getData();
  }
}
