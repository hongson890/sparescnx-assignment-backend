import { Controller, Get } from '@nestjs/common';
import { IncidentService } from './incident.service';

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
}
