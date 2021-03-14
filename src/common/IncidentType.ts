export class IncidentType {
  public static NOTIFICATION = {
    name: 'Notification',
    value: 'NOTIFICATION',
  }

  public static NORMAL = {
    name: 'Normal',
    value: 'NORMAL',
  }

  public static SERIOUS = {
    name: 'Serious',
    value: 'SERIOUS',
  }

  public static IMMEDIATE = {
    name: 'Immediate',
    value: 'IMMEDIATE',
  }

  public static get LIST(): Array<any> {
    return [this.NOTIFICATION, this.NORMAL, this.SERIOUS, this.IMMEDIATE]
  }
}
