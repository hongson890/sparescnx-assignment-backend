import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { CouchDbModule } from '../couchdb/module';
import { User } from '../users/user.entity';

@Module({
  imports: [
    CouchDbModule.forFeature([User]),
    JwtModule.register({
      secretOrPrivateKey: 'secret12356789',
    }),
  ],
  providers: [UserService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
