// src/core/application/use-cases/appointment.facade.ts

import { Inject, Injectable } from '@nestjs/common';
import { Appointment } from '../internal/core/domain/entities/appointment.entity';
import { AppointmentService } from '../internal/core/application/appointment.service';

@Injectable()
export class AppointmentFacade {
  constructor(
    @Inject(AppointmentService)
    private readonly appointmentService: AppointmentService,
  ) {}

  /**
   * Publicly exposed method that delegates to the AppointmentService.
   */
  public async createAppointment(
    slotId: string,
    patientId: string,
    patientName: string,
    doctorId: string,
    appointmentTime: Date,
  ): Promise<Appointment> {
    return this.appointmentService.createAppointment(
      slotId,
      patientId,
      patientName,
      doctorId,
      appointmentTime,
    );
  }
}
