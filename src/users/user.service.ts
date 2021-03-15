import { DocumentListResponse, MangoQuery, MangoResponse } from 'nano';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '../couchdb/module';
import { Repository } from '../couchdb/interfaces';
import { User } from './user.entity';
import { Incident } from '../incident/incident.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllUserByRole(role: string) {
    const q: MangoQuery = {
      selector: {
        firstName: { $exists: true },
        role: { $eq: role },
      },
    };
    const data = await this.userRepository.find(q);
    return data.docs;
  }

  async findByEmail(email: string) {
    const q: MangoQuery = {
      selector: {
        email: { $eq: email },
      },
      fields: ['email', 'role'],
    };
    const result = await this.userRepository.find(q);
    const data = result.docs ? result.docs[0] : null;
    return data;
  }

  async getUserById(_id: string) {
    const q: MangoQuery = {
      selector: {
        _id: { $eq: _id },
      },
      fields: ['firstName', 'lastName'],
    };
    const result = await this.userRepository.find(q);
    const data = result.docs ? result.docs[0] : null;
    return data;
  }

  async create(user: User) {
    const result = await this.userRepository.insert(user);
    if (!result.ok) {
      throw new HttpException('Insert user fail', HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmailAndPassword(email: string, password: string) {
    const q: MangoQuery = {
      selector: {
        email: { $eq: email },
        password: { $eq: password },
      },
      fields: ['_id', '_rev', 'email', 'role'],
    };
    const result = await this.userRepository.find(q);
    const data = result.docs ? result.docs[0] : null;
    return data;
  }

  async findUserByEmail(email: string) {
    const q: MangoQuery = {
      selector: {
        email: { $eq: email },
      },
      fields: ['_id', '_rev', 'email', 'role'],
    };
    const result = await this.userRepository.find(q);
    const data = result.docs ? result.docs[0] : null;
    return data;
  }
}
