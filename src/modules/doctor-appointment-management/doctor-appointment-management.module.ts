import { Module } from '@nestjs/common';
import { AppointmentController } from './internal/adapters/in/api/appointment.controller';
import { InMemoryAppointmentRepository } from './internal/adapters/out/db/in-memory-appointment.repository';
import { AppointmentService } from './internal/core/application/appointment.service';
import { AppointmentFacade } from './shared/appointment.facade';
import { DoctorAvailabilityModule } from '../doctor-availability/doctor-availability.module';
import { IDoctorAvailabilityGateway } from './internal/core/application/doctor-availability.gateway.interface';
import { DoctorAvailabilityGateway } from './internal/adapters/out/gateways/doctor-availability.gateway';
@Module({
  imports: [DoctorAvailabilityModule],
  controllers: [AppointmentController],
  providers: [
    AppointmentFacade,
    {
      provide: 'IAppointmentRepository',
      useClass: InMemoryAppointmentRepository,
    },
    {
      provide: IDoctorAvailabilityGateway,
      useClass: DoctorAvailabilityGateway,
    },
    AppointmentService,
  ],
  exports: [AppointmentFacade],
})
export class DoctorAppointmentManagementModule {}
