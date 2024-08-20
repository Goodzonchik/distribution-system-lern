import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

export type RelationshipDTO = {
  nameFrom: string;
  nameTo: string;
  relationship: string;
};

export type NodeDTO = {
  type: string;
  propName: string;
  propValue: string;
};

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Observable<any> | Promise<any> {
    return this.usersService.getUsers();
  }

  @Get(':name')
  searchByName(@Param('name') name: string): Observable<any> | Promise<any> {
    return this.usersService.searchByName(name);
  }

  @Post('create-relationship')
  createRelationShip(
    @Body() body: RelationshipDTO,
  ): Observable<any> | Promise<any> {
    return this.usersService.createRelationship(body);
  }

  @Post()
  createUser(@Body() body: NodeDTO): Observable<any> | Promise<any> {
    return this.usersService.createUser(body);
  }
}
