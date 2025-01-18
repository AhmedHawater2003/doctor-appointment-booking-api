import { Injectable } from '@nestjs/common';
import { IAppointmentBookingRepo } from 'src/modules/appointment-booking/domain/contracts/appointment-booking-repo.interface';
import { BookAppointmentInput } from './book-appointment.input';
import { AppointmentBooking } from 'src/modules/appointment-booking/domain/models/appointment-booking.model';
import { IDoctorAvailabilityGateway } from 'src/modules/appointment-booking/domain/contracts/doctor-availability-gateway.interface';
import { v4 as uuidv4 } from 'uuid';
import { SlotNotAvailableException } from '../../../domain/exceptions/slot-not-available.exception';

@Injectable()
export class BookAppointmentInteractor {
  constructor(
    private readonly appointmentBookingRepo: IAppointmentBookingRepo,
    private readonly doctorAvailabilityGateway: IDoctorAvailabilityGateway,
  ) {}

  async execute(input: BookAppointmentInput): Promise<AppointmentBooking> {
    const appointmentBooking = new AppointmentBooking(
      uuidv4(),
      input.slotId,
      input.patientId,
      input.patientName,
      input.reservedAt,
    );

    const availableSlot = await this.doctorAvailabilityGateway.getSlot(
      appointmentBooking.getSlotId(),
    );

    if (!availableSlot.isStillAvailable()) {
      throw new SlotNotAvailableException(appointmentBooking.getSlotId());
    }

    return await this.appointmentBookingRepo.save(appointmentBooking);

    //TODO: create an Appointment by calling doctor appointment management service
  }
}
