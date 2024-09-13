import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  person_id: string;

  @Column({ nullable: false, default: '' })
  name: string;

  @Column({ nullable: false, default: '' })
  last_name: string;

  @Column({ nullable: false, default: '2000-01-01' })
  birth_date: string;
}

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private usersRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Person[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<Person | null> {
    return this.usersRepository.findOneBy({ person_id: id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
