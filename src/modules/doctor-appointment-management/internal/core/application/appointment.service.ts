import { Inject, Injectable } from '@nestjs/common';
import {
  Appointment,
  AppointmentStatus,
} from '../domain/entities/appointment.entity';
import { IAppointmentRepository } from './ports/out/appointment.repository';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async createAppointment(
    slotId: string,
    patientId: string,
    patientName: string,
    doctorId: string,
    appointmentTime: Date,
  ): Promise<Appointment> {
    const appointment = new Appointment(
      slotId,
      patientId,
      patientName,
      doctorId,
      appointmentTime,
    );
    await this.appointmentRepository.save(appointment);
    return appointment;
  }

  async getUpcomingAppointments(doctorId: string): Promise<Appointment[]> {
    // We consider "upcoming" = SCHEDULED and appointmentTime >= now
    const scheduledAppointments =
      await this.appointmentRepository.findByDoctorIdAndStatus(doctorId, [
        AppointmentStatus.SCHEDULED,
      ]);
    const now = new Date();
    return scheduledAppointments.filter((appt) => appt.appointmentTime >= now);
  }

  async updateAppointmentStatus(
    appointmentId: string,
    newStatus: AppointmentStatus,
  ): Promise<void> {
    const appointment =
      await this.appointmentRepository.findById(appointmentId);
    if (!appointment) {
      throw new Error(`Appointment with ID ${appointmentId} not found.`);
    }

    switch (newStatus) {
      case AppointmentStatus.COMPLETED:
        appointment.markAsCompleted();
        break;
      case AppointmentStatus.CANCELED:
        appointment.cancel();
        break;
      case AppointmentStatus.SCHEDULED:
        // Typically we don't revert an existing appointment to SCHEDULED unless domain allows
        throw new Error(
          `Cannot revert to ${AppointmentStatus.SCHEDULED} in this domain logic.`,
        );
      default:
        throw new Error(`Unsupported status: ${newStatus}`);
    }

    await this.appointmentRepository.save(appointment);
  }
}
