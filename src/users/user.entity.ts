import { CouchDbEntity, Entity } from '../couchdb';

@Entity('user')
export class User extends CouchDbEntity {
  email: string;
  password: string;
  role: string;
  id: string;
}
