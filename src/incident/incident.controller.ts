import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IncidentService } from './incident.service';
import { Incident } from './incident.entity';
import { CouchDbEntity } from '../couchdb';
import { IncidentCreatedDTO } from './IncidentCreatedDTO';
import { AuthGuard } from '@nestjs/passport';

@Controller('incidents')
@UseGuards(AuthGuard())
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Post('/create')
  async createIncident(@Body() incident: IncidentCreatedDTO) {
    return this.incidentService.create(incident);
  }

  @Post('/search')
  async searchIncident(@Body() searchObj: any) {
    return this.incidentService.search(
      searchObj.incidentType,
      searchObj.page,
      searchObj.limit,
      searchObj.sortedBy,
    );
  }

  @Delete()
  async deleteIncident(@Body() deleteObj: CouchDbEntity) {
    return this.incidentService.delete(deleteObj);
  }

  @Delete('/delete')
  async deleteIncidentList(@Body() deletedIds: string[]) {
    return this.incidentService.deleteIncidentList(deletedIds);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() incident: Incident) {
    return `This action updates a #${id} cat`;
  }

  @Get(':id')
  getIncidentDetailById(@Param('id') id: string) {
    return this.incidentService.getIncidentDetailById(id);
  }
}
