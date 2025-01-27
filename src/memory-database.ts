import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryDatabase {
  private database = {} as Record<TableName, Table>;
  constructor() {
    Object.values(TableName).forEach((tableName) => {
      this.database[tableName] = new Table();
    });
  }

  public insert(tableName: TableName, key: string, value: any): void {
    return this.database[tableName].insert(key, value);
  }

  public load(tableName: TableName, key: string): any {
    return this.database[tableName].load(key);
  }

  public loadAll(tableName: TableName): Record<string, any> {
    return this.database[tableName].loadAll();
  }
}
class Table {
  private data: Record<string, any> = {};

  public insert(key: string, value: any): void {
    return (this.data[key] = value);
  }

  public load(key: string): any {
    return this.data[key];
  }

  public loadAll(): Record<string, any> {
    return this.data;
  }
}

export enum TableName {
  AppointmentBooking = 'appointment_booking',
  Slot = 'slot',
  Appointment = 'appointment',
  AppointmentConfirmation = 'appointment_confirmation',
}
