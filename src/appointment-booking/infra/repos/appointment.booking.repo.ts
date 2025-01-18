import { Injectable } from '@nestjs/common';
import { IAppointmentBookingRepo } from 'src/appointment-booking/domain/contracts/appointment-booking-repo.interface';
import { AppointmentBooking } from 'src/appointment-booking/domain/models/appointment-booking.model';
import { MemoryDatabase, TableName } from 'src/memory-database';

@Injectable()
export class AppointmentBookingRepo implements IAppointmentBookingRepo {
  constructor(private readonly database: MemoryDatabase) {}

  async save(appointmentBooking: AppointmentBooking): Promise<any> {
    return this.database.insert(
      TableName.AppointmentBooking,
      appointmentBooking.getId(),
      appointmentBooking,
    );
  }

  async getAll(): Promise<AppointmentBooking[]> {
    return Object.values(this.database.loadAll(TableName.AppointmentBooking));
  }
}
