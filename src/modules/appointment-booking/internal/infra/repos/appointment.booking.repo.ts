import { Injectable } from '@nestjs/common';
import { IAppointmentBookingRepo } from 'src/modules/appointment-booking/internal/domain/contracts/appointment-booking-repo.interface';
import { AppointmentBooking } from 'src/modules/appointment-booking/internal/domain/models/appointment-booking.model';
import { MemoryDatabase, TableName } from 'src/memory-database';
import { AppointmentPublisher } from '../../adapters/publishers/AppointmentPublisher';

@Injectable()
export class AppointmentBookingRepo implements IAppointmentBookingRepo {
  constructor(private readonly database: MemoryDatabase,private readonly appointmentPublisher: AppointmentPublisher) {}

  async save(appointmentBooking: AppointmentBooking): Promise<any> {

    const appointment = this.database.insert(
      TableName.AppointmentBooking,
      appointmentBooking.getId(),
      appointmentBooking,
    );
        
    appointmentBooking.getOccuredEvents().forEach(event => this.appointmentPublisher.publish(event))

    return appointment
  }

  async getAll(): Promise<AppointmentBooking[]> {
    return Object.values(this.database.loadAll(TableName.AppointmentBooking));
  }
}
