import {
  Appointment,
  AppointmentStatus,
} from '../domain/entities/appointment.entity';
import { AppointmentService } from './appointment.service';
import { IAppointmentRepository } from './ports/out/appointment.repository';

describe('AppointmentService', () => {
  let appointmentService: AppointmentService;
  let appointmentRepository: jest.Mocked<IAppointmentRepository>;

  beforeEach(() => {
    appointmentRepository = {
      save: jest.fn(),
      findByDoctorIdAndStatus: jest.fn(),
      // Add other methods if needed
    } as unknown as jest.Mocked<IAppointmentRepository>;

    appointmentService = new AppointmentService(appointmentRepository);
  });

  it('should create and save a new appointment', async () => {
    const slotId = 'slot1';
    const patientId = 'patient1';
    const patientName = 'John Doe';
    const doctorId = 'doctor1';
    const appointmentTime = new Date();

    const appointment = new Appointment(
      slotId,
      patientId,
      patientName,
      doctorId,
      appointmentTime,
    );

    await appointmentService.createAppointment(
      slotId,
      patientId,
      patientName,
      doctorId,
      appointmentTime,
    );

    expect(appointmentRepository.save).toHaveBeenCalledWith(appointment);
  });

  it('should get upcoming appointments', async () => {
    const doctorId = 'doctor1';
    const now = new Date();
    const futureDate = new Date(now.getTime() + 10000);
    const pastDate = new Date(now.getTime() - 10000);

    const scheduledAppointments = [
      new Appointment('slot1', 'patient1', 'John Doe', doctorId, futureDate),
      new Appointment('slot2', 'patient2', 'Jane Doe', doctorId, pastDate),
    ];

    appointmentRepository.findByDoctorIdAndStatus.mockResolvedValue(
      scheduledAppointments,
    );

    const upcomingAppointments =
      await appointmentService.getUpcomingAppointments(doctorId);

    expect(upcomingAppointments).toHaveLength(1);
    expect(upcomingAppointments[0].appointmentTime).toBe(futureDate);
  });

  it('should update appointment status', async () => {
    const appointmentId = 'appointment1';
    const newStatus = AppointmentStatus.COMPLETED;

    const appointment = new Appointment(
      'slot1',
      'patient1',
      'John Doe',
      'doctor1',
      new Date(),
    );
    appointmentRepository.findById = jest.fn().mockResolvedValue(appointment);

    await appointmentService.updateAppointmentStatus(appointmentId, newStatus);

    expect(appointment.status).toBe(newStatus);
    expect(appointmentRepository.save).toHaveBeenCalledWith(appointment);
  });
});
