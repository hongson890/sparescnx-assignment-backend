import { CouchDbEntity, Entity } from '../couchdb';

@Entity('incident')
export class Incident extends CouchDbEntity {
  name: string;
}
