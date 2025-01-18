import { Injectable } from '@nestjs/common';
import { IAppointmentBookingRepo } from 'src/appointment-booking/domain/contracts/appointment-booking-repo.interface';
import { BookAppointmentInput } from './book-appointment.input';
import { AppointmentBooking } from 'src/appointment-booking/domain/models/appointment-booking.model';

@Injectable()
export class BookAppointmentInteractor {
  constructor(
    private readonly appointmentBookingRepo: IAppointmentBookingRepo,
  ) {}

  async execute(input: BookAppointmentInput): Promise<AppointmentBooking> {
    const booking = await this.appointmentBookingRepo.create(
      input.slotId,
      input.patientId,
      input.patientName,
      input.reservedAt,
    );

    return booking;

    //TODO: create an Appointment by calling doctor appointment management service
  }
}
