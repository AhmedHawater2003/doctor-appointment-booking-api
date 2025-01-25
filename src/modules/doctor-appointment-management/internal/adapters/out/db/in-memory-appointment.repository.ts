import { Injectable } from '@nestjs/common';

import { IAppointmentRepository } from '../../../core/application/ports/out/appointment.repository';
import {
  Appointment,
  AppointmentStatus,
} from '../../../core/domain/entities/appointment.entity';

/**
 * A simple in-memory repository. In production, you'd replace this
 * with TypeORM/Prisma/Mongoose or another real database adapter.
 */
@Injectable()
export class InMemoryAppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  async save(appointment: Appointment): Promise<void> {
    const index = this.appointments.findIndex((a) => a.id === appointment.id);
    if (index >= 0) {
      this.appointments[index] = appointment;
    } else {
      this.appointments.push(appointment);
    }
  }

  async findById(id: string): Promise<Appointment | null> {
    return this.appointments.find((a) => a.id === id) || null;
  }

  async findByDoctorIdAndStatus(
    doctorId: string,
    statuses: AppointmentStatus[],
  ): Promise<Appointment[]> {
    return this.appointments.filter(
      (a) => a.doctorId === doctorId && statuses.includes(a.status),
    );
  }
}
