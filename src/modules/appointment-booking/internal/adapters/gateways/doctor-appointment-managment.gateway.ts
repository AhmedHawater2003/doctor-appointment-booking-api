import { Injectable } from '@nestjs/common';
import { IDoctorAppointmentManagementGateway } from 'src/modules/appointment-booking/internal/domain/contracts/doctor-appointment-management-gateway.interface';
import { AppointmentFacade } from 'src/modules/doctor-appointment-management/shared/appointment.facade';
import { AppointmentBooking } from 'src/modules/appointment-booking/internal/domain/models/appointment-booking.model';
import { env } from 'process';

@Injectable()
export class DoctorAppointmentManagementGateway
  implements IDoctorAppointmentManagementGateway
{
  constructor(
    private readonly appointmentManagementFacade: AppointmentFacade,
  ) {}

  async createAppointment(
    appointmentBooking: AppointmentBooking,
    slotTiming: Date,
  ) {
    await this.appointmentManagementFacade.createAppointment(
      appointmentBooking.getSlotId(),
      appointmentBooking.getPatientId(),
      appointmentBooking.getPatientName(),
      env.ADMIN_DOCTOR_ID as string,
      slotTiming,
    );
  }
}
