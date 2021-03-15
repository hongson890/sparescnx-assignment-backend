import { Incident } from './incident.entity';
import { CouchDbModule } from '../couchdb/module';
import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    CouchDbModule.forFeature([Incident]),
    CouchDbModule.forFeature([User]),
  ],
  providers: [IncidentService, UserService],
  controllers: [IncidentController],
})
export class IncidentModule {}
