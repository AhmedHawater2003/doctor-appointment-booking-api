import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppointmentService } from '../../../core/application/appointment.service';
import { AppointmentStatus } from '../../../core/domain/entities/appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  /**
   * Create a new appointment
   */
  @Post()
  async create(
    @Body()
    body: {
      slotId: string;
      patientId: string;
      patientName: string;
      doctorId: string;
      appointmentTime: string;
    },
  ) {
    const appointmentTime = new Date(body.appointmentTime);
    const appointment = await this.appointmentService.createAppointment(
      body.slotId,
      body.patientId,
      body.patientName,
      body.doctorId,
      appointmentTime,
    );
    return appointment;
  }

  /**
   * Get upcoming appointments for a specific doctor
   */
  @Get('doctor/:doctorId/upcoming')
  async getUpcoming(@Param('doctorId') doctorId: string) {
    const appointments =
      await this.appointmentService.getUpcomingAppointments(doctorId);
    return appointments;
  }

  /**
   * Update an appointment's status (complete or cancel)
   */
  @Patch(':appointmentId/status')
  async updateStatus(
    @Param('appointmentId') appointmentId: string,
    @Body() body: { newStatus: AppointmentStatus },
  ) {
    await this.appointmentService.updateAppointmentStatus(
      appointmentId,
      body.newStatus,
    );
    return { message: 'Appointment status updated successfully.' };
  }
}
