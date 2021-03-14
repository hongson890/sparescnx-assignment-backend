import { DocumentListResponse, MangoQuery, MangoResponse } from 'nano';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '../couchdb/module';
import { Repository } from '../couchdb/interfaces';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<MangoResponse<User>> {
    const q: MangoQuery = {
      selector: {
        email: { $eq: 'admin@gmail.com' },
        password: { $eq: 'e10adc3949ba59abbe56e057f20f883e' },
      },
      fields: ['email', 'password', 'role'],
    };
    return this.userRepository.find(q);
  }

  async findByEmail(email: string) {
    const q: MangoQuery = {
      selector: {
        email: { $eq: email },
      },
      fields: ['email', 'role'],
    };
    const aa = await this.userRepository.find(q);
    const result = aa.docs ? aa.docs[0] : null;
    return result;
  }

  async findByEmailAndPassword(email: string, password: string) {
    const q: MangoQuery = {
      selector: {
        email: { $eq: email },
        password: { $eq: password },
      },
      fields: ['_id', '_rev', 'email', 'role'],
    };
    const aa = await this.userRepository.find(q);
    const result = aa.docs ? aa.docs[0] : null;
    return result;
  }
}
