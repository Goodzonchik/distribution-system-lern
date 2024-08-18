import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  getData(): Observable<any> | Promise<any> {
    return this.UsersService.getData();
  }
}
