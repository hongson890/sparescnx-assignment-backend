import { Configuration } from 'nano';

export interface CouchDbConnectionConfig extends Configuration {
  sync?: boolean;
}
