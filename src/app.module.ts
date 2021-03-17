import { Module } from '@nestjs/common';
import { CouchDbModule } from './couchdb/module';
import { UserModule } from './users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { IncidentModule } from './incident/incident.module';
import { DB_CONFIG } from './db.config';

@Module({
  imports: [
    CouchDbModule.forRoot(DB_CONFIG),
    JwtModule.register({
      secretOrPrivateKey: 'secret12356789',
    }),
    AuthModule,
    UserModule,
    IncidentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
