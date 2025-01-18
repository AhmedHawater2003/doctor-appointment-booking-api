import { AppointmentBooking } from 'src/appointment-booking/domain/models/appointment-booking.model';

export abstract class IAppointmentBookingRepo {
  abstract create(
    slotId: string,
    patientId: string,
    patientName: string,
    reservedAt: Date,
  ): Promise<AppointmentBooking>;
}
