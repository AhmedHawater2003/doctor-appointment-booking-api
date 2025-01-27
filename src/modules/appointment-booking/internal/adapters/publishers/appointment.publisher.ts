import { IEventBus } from 'src/shared/IEventBus';
import { IAppointmentEvent } from '../../domain/models/IAppointmentEvent';
import { AppointmentBooked } from '../../domain/models/AppointmentBooked';
import { Injectable } from '@nestjs/common';
import { AppointmentBookedDto } from 'src/modules/appointment-booking/shared/dtos/AppointmentBookedDto';

@Injectable()
export class AppointmentPublisher {
  constructor(private readonly eventBus: IEventBus) {}

  public publish(appointmentEvent: IAppointmentEvent): void {
    if (appointmentEvent instanceof AppointmentBooked) {
      const integrationEvent: AppointmentBookedDto = {
        patientName: appointmentEvent.patientName,
        appointmentTime: appointmentEvent.appointmentTime,
        doctorName: appointmentEvent.doctorName,
      };

      this.eventBus.emit('AppointmentBooked', integrationEvent);
    } else {
      throw new Error('Event not supported');
    }
  }
}
