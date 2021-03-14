import { DocumentListResponse } from 'nano';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '../couchdb/module';
import { Repository } from '../couchdb/interfaces';
import { Incident } from './incident.entity';

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(Incident)
    private readonly catsRepository: Repository<Incident>,
  ) {}

  findAll(): Promise<DocumentListResponse<Incident>> {
    return this.catsRepository.list();
  }
}
