import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

export type RelationshipDTO = {
  nameFrom: string;
  nameTo: string;
  relationship: string;
};

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  getUsers(): Observable<any> | Promise<any> {
    return this.UsersService.getUsers();
  }

  @Get(':name')
  searchByName(@Param('name') name: string): Observable<any> | Promise<any> {
    return this.UsersService.searchByName(name);
  }

  @Post('create-relationship')
  createRelationShip(
    @Body() body: RelationshipDTO,
  ): Observable<any> | Promise<any> {
    return this.UsersService.createRelationship(body);
  }
}
