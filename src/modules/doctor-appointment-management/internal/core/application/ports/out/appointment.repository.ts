import {
  Appointment,
  AppointmentStatus,
} from '../../../domain/entities/appointment.entity';

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  findById(id: string): Promise<Appointment | null>;
  findByDoctorIdAndStatus(
    doctorId: string,
    statuses: AppointmentStatus[],
  ): Promise<Appointment[]>;
}
