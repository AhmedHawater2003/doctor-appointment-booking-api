import { AppointmentBooking } from '../models/appointment-booking.model';

export abstract class IDoctorAppointmentManagementGateway {
  abstract createAppointment(
    appointmentBooking: AppointmentBooking,
    slotTiming: Date,
  ): Promise<void>;
}
