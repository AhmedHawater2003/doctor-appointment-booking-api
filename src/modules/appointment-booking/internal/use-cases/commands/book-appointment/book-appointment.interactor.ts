import { Injectable } from '@nestjs/common';
import { IAppointmentBookingRepo } from 'src/modules/appointment-booking/internal/domain/contracts/appointment-booking-repo.interface';
import { BookAppointmentInput } from './book-appointment.input';
import { AppointmentBooking } from 'src/modules/appointment-booking/internal/domain/models/appointment-booking.model';
import { IDoctorAvailabilityGateway } from 'src/modules/appointment-booking/internal/domain/contracts/doctor-availability-gateway.interface';
import { v4 as uuidv4 } from 'uuid';
import { SlotNotAvailableException } from 'src/modules/appointment-booking/internal/domain/exceptions/slot-not-available.exception';
import { IDoctorAppointmentManagementGateway } from 'src/modules/appointment-booking/internal/domain/contracts/doctor-appointment-management-gateway.interface';
import { AvailableSlot } from 'src/modules/appointment-booking/internal/domain/models/available-slot.model';

@Injectable()
export class BookAppointmentInteractor {
  constructor(
    private readonly appointmentBookingRepo: IAppointmentBookingRepo,
    private readonly doctorAvailabilityGateway: IDoctorAvailabilityGateway,
    private readonly doctorAppointmentManagementGateway: IDoctorAppointmentManagementGateway,
  ) {}

  async execute(input: BookAppointmentInput): Promise<AppointmentBooking> {
    const availableSlot = await this.checkSlotAvailability(input.slotId);

    const doctorName = 'Doctor Ahmed';
    const appointmentBooking = AppointmentBooking.newAppointment(
      uuidv4(),
      input.slotId,
      input.patientId,
      input.patientName,
      new Date(),
      availableSlot.getTime(),
      doctorName,
    );

    await this.doctorAvailabilityGateway.reserveSlot(input.slotId);

    const savedAppointmentBooking =
      await this.appointmentBookingRepo.save(appointmentBooking);

    await this.doctorAppointmentManagementGateway.createAppointment(
      appointmentBooking,
      availableSlot.getTime(),
    );

    return savedAppointmentBooking;
  }

  private async checkSlotAvailability(slotId: string): Promise<AvailableSlot> {
    const availableSlot =
      await this.doctorAvailabilityGateway.getSlotIfAvailable(slotId);

    if (!availableSlot) {
      throw new SlotNotAvailableException(slotId);
    }

    return availableSlot;
  }
}
