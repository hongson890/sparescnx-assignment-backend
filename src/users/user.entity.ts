import { CouchDbEntity, Entity } from '../couchdb';

@Entity('user')
export class User extends CouchDbEntity {
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  createdAt: Date = new Date();
  id: string;
  createBy?: string;
}
