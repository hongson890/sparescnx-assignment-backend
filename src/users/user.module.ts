import { User } from './user.entity';
import { CouchDbModule } from '../couchdb/module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [CouchDbModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
