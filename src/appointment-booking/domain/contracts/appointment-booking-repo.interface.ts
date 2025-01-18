import { AppointmentBooking } from 'src/appointment-booking/domain/models/appointment-booking.model';

export abstract class IAppointmentBookingRepo {
  abstract save(
    appointmentBooking: AppointmentBooking,
  ): Promise<AppointmentBooking>;
  abstract getAll(): Promise<AppointmentBooking[]>;
}
