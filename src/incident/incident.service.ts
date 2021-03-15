import { DocumentListResponse, MangoQuery } from 'nano';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '../couchdb/module';
import { Repository } from '../couchdb/interfaces';
import { Incident } from './incident.entity';
import { CouchDbEntity } from '../couchdb';

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
  ) {}

  findAll(): Promise<DocumentListResponse<Incident>> {
    return this.incidentRepository.list();
  }

  async create(incident: Incident) {
    const result = await this.incidentRepository.insert(incident);
    if (!result.ok) {
      throw new HttpException('Insert incident fail', HttpStatus.BAD_REQUEST);
    }
  }

  async search(input: string, page: number, limit: number, orderBy: string[]) {
    const q: MangoQuery = {
      selector: {
        name: { $eq: input },
      },
    };
    const result = await this.incidentRepository.find(q);
    const data = result.docs;
    return data;
  }

  async delete(deleteObj: CouchDbEntity) {
    try {
      const result = await this.incidentRepository.destroy(
        deleteObj._id,
        deleteObj._rev,
      );
      if (!result.ok) {
        throw new HttpException('delete incident fail', HttpStatus.BAD_GATEWAY);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
