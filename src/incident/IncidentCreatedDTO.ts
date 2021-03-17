import { IncidentType } from '../common/IncidentType';
import { IncidentStatus } from '../common/IncidentStatus';

export class IncidentCreatedDTO {
  name: string;
  assignee: string;
  type: string = IncidentType.NORMAL.value;
  incidentDate?: Date = new Date();
  description? = '';
  note? = '';
  status: string = IncidentStatus.NEW.value;
  userId?: string;
  createdBy = '';
  createdAt: Date = new Date();
}
