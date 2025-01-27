import { AppointmentBooking } from 'src/modules/appointment-booking/internal/domain/models/appointment-booking.model';

export abstract class IAppointmentBookingRepo {
  abstract save(
    appointmentBooking: AppointmentBooking,
  ): Promise<AppointmentBooking>;
  abstract getAll(): Promise<AppointmentBooking[]>;
}
