import { User } from './user.entity';
import { CouchDbModule } from '../couchdb/module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CouchDbModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
