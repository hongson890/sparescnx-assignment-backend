import { BulkModifyDocsWrapper, DocumentListResponse, MangoQuery } from 'nano';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '../couchdb/module';
import { Repository } from '../couchdb/interfaces';
import { Incident } from './incident.entity';
import { CouchDbEntity } from '../couchdb';
import { IncidentCreatedDTO } from './IncidentCreatedDTO';

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
  ) {}

  findAll(): Promise<DocumentListResponse<Incident>> {
    return this.incidentRepository.list();
  }

  async create(incident: IncidentCreatedDTO) {
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

  async getIncidentsByIds(ids: string[]) {
    const q: MangoQuery = {
      selector: {
        _id: { $in: ids },
      },
    };
    const result = await this.incidentRepository.find(q);
    const data = result.docs;
    return data;
  }

  async deleteIncidentList(deletedId: string[]) {
    try {
      const listDocs = await this.getIncidentsByIds(deletedId);
      const deletedList: BulkModifyDocsWrapper = {
        docs: listDocs.map((a) => {
          return {
            ...a,
            _deleted: true,
          };
        }),
      };
      const result = await this.incidentRepository.bulk(deletedList);
    } catch (e) {
      throw new HttpException('delete incident fail', HttpStatus.BAD_GATEWAY);
      console.log(e);
    }
  }
}
