import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CouchDbModule } from '../couchdb/module';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { secretKey } from './auth.constant';

@Module({
  imports: [
    CouchDbModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secretOrPrivateKey: secretKey,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  providers: [UserService, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
