export class IncidentStatus {
  public static NEW = {
    name: 'New',
    value: 'NEW',
  };

  public static ASSIGNED = {
    name: 'Assigned',
    value: 'ASSIGNED',
  };

  public static RESOLVED = {
    name: 'Resolved',
    value: 'RESOLVED',
  };

  public static CLOSED = {
    name: 'Closed',
    value: 'CLOSED',
  };

  public static get LIST(): Array<any> {
    return [this.NEW, this.ASSIGNED, this.RESOLVED, this.CLOSED];
  }
}
