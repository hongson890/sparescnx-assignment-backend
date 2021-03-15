import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IncidentService } from './incident.service';
import { Incident } from './incident.entity';
import { CouchDbEntity } from '../couchdb';

@Controller('incidents')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Get('/')
  getHello(): string {
    this.incidentService
      .findAll()
      .then((result: any) => {
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
    return 'aaa';
  }

  @Post('/create')
  async createIncident(@Body() incident: Incident) {
    return this.incidentService.create(incident);
  }

  @Post('/search')
  async searchIncident(@Body() searchObj: any) {
    return this.incidentService.search(
      searchObj.input,
      searchObj.page,
      searchObj.limit,
      searchObj.orderBy,
    );
  }

  @Delete()
  async deleteIncident(@Body() deleteObj: CouchDbEntity) {
    return this.incidentService.delete(deleteObj);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() incident: Incident) {
    return `This action updates a #${id} cat`;
  }
}
