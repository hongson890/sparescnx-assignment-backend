import { IncidentController } from './incident.controller';
import { IncidentService } from './incident.service';
import { Test } from '@nestjs/testing';
import { CouchDbModule } from '../couchdb/module';
import { Incident } from './incident.entity';
import { DB_CONFIG } from '../db.config';
import * as incidentData from '../mockdata/incidents.json';
import { PassportModule } from '@nestjs/passport';
import { CouchDbEntity } from '../couchdb';

describe('IncidentController', () => {
  let incidentController: IncidentController;
  let incidentService: IncidentService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        CouchDbModule.forRoot(DB_CONFIG),
        CouchDbModule.forFeature([Incident]),
      ],
      providers: [IncidentService],
      controllers: [IncidentController],
    }).compile();

    incidentService = module.get<IncidentService>(IncidentService);
    incidentController = module.get<IncidentController>(IncidentController);
  });

  describe('Searching Incident ', () => {
    it('should able to search incident', async () => {
      const datas: unknown[] = incidentData;
      const mockResponse = Promise.resolve({
        rows: datas,
        total_rows: incidentData.length,
      });
      const results = await mockResponse;

      jest
        .spyOn(incidentService, 'search')
        .mockImplementation(() => mockResponse);

      expect(
        await incidentController.searchIncident({
          incidentType: 'NORMAL',
          page: 1,
          limit: 10,
          sortedBy: 'createdAt',
        }),
      ).toBe(results);
    });
  });

  describe('getIncidentDetailById', () => {
    it('should return detail of incident', async () => {
      const results = Promise.resolve(incidentData[0]);
      const data = await results;

      jest
        .spyOn(incidentService, 'getIncidentDetailById')
        .mockImplementation(() => results);

      expect(await incidentController.getIncidentDetailById('id')).toBe(data);
    });
  });

  describe('createIncident', () => {
    it('should able to create detail of incident', async () => {
      const results = Promise.resolve({
        ok: true,
        id: '123456',
        rev: 'abc',
      });
      const data = await results;

      jest
        .spyOn(incidentService, 'createOrUpdate')
        .mockImplementation(() => results);

      expect(await incidentController.createIncident(new Incident())).toBe(
        data,
      );
    });
  });

  describe('updateIncident', () => {
    it('should able to update incident', async () => {
      const results = Promise.resolve({
        ok: true,
        id: '123456',
        rev: 'abc',
      });
      const data = await results;

      jest
        .spyOn(incidentService, 'createOrUpdate')
        .mockImplementation(() => results);

      expect(await incidentController.update('123456', new Incident())).toBe(
        data,
      );
    });
  });

  describe('deleteIncident', () => {
    it('should able to delete incident', async () => {
      jest
        .spyOn(incidentService, 'delete')
        .mockImplementation(() => Promise.resolve(true));

      expect(await incidentController.deleteIncident(new CouchDbEntity())).toBe(
        true,
      );
    });
  });
});
