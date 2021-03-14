import { Module } from '@nestjs/common';
import { CouchDbModule } from './couchdb/module';
import { UserModule } from './users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { IncidentModule } from './incident/incident.module';

@Module({
  imports: [
    CouchDbModule.forRoot({
      url: 'http://localhost:5984',
      username: 'sparescnx_user',
      userpass: '123456',
      requestDefaults: { jar: true },
    }),
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
