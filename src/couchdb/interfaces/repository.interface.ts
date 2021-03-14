import { DocumentScope } from 'nano';

export interface Repository<T> extends DocumentScope<T> {
  // eslint-disable-next-line @typescript-eslint/no-misused-new
  new (): Repository<T>;
  entity: T;
}
