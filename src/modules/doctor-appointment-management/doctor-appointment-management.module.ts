import { Module } from '@nestjs/common';
import { AppointmentController } from './internal/adapters/in/api/appointment.controller';
import { InMemoryAppointmentRepository } from './internal/adapters/out/db/in-memory-appointment.repository';
import { AppointmentService } from './internal/core/application/appointment.service';
import { AppointmentFacade } from './shared/appointment.facade';

@Module({
  controllers: [AppointmentController],
  providers: [
    AppointmentFacade,
    {
      provide: 'AppointmentRepository',
      useClass: InMemoryAppointmentRepository,
    },
    {
      provide: AppointmentService,
      useFactory: (repo) => new AppointmentService(repo),
      inject: ['AppointmentRepository'],
    },
  ],
  exports: [AppointmentFacade],
})
export class DoctorAppointmentManagementModule {}
