import { BulkModifyDocsWrapper, DocumentListResponse, MangoQuery } from 'nano';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '../couchdb/module';
import { Repository } from '../couchdb/interfaces';
import { Incident } from './incident.entity';
import { CouchDbEntity } from '../couchdb';
import { IncidentCreatedDTO } from './IncidentCreatedDTO';
import { UserService } from '../users/user.service';

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
    private userService: UserService,
  ) {}

  findAll(): Promise<DocumentListResponse<Incident>> {
    return this.incidentRepository.list();
  }

  async createOrUpdate(incident: IncidentCreatedDTO) {
    const result = await this.incidentRepository.insert(incident);
    if (!result.ok) {
      throw new HttpException('Insert incident fail', HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  async search(
    incidentType: string,
    page: number,
    limit: number,
    sortedBy: string,
  ) {
    const key = incidentType;
    const indexName = 'by_type';
    const params = {
      limit: limit + 1,
      skip: limit * page,
      sort: sortedBy,
      reduce: false,
      key: key,
      descending: true,
    };
    try {
      const result = await this.incidentRepository.view(
        'incident',
        indexName,
        params,
      );
      return result;
    } catch (e) {
      return null;
    }
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

  async getIncidentDetailById(id: string) {
    const key = id;
    const indexName = 'by_id';
    const params = {
      key: key,
    };
    try {
      const result = await this.incidentRepository.view(
        'incident',
        indexName,
        params,
      );
      return result.rows[0] ? result.rows[0].value : null;
    } catch (e) {
      return null;
    }
  }
}
