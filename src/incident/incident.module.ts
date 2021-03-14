import { Incident } from './incident.entity';
import { CouchDbModule } from '../couchdb/module';
import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';

@Module({
  imports: [CouchDbModule.forFeature([Incident])],
  providers: [IncidentService],
  controllers: [IncidentController],
})
export class IncidentModule {}
