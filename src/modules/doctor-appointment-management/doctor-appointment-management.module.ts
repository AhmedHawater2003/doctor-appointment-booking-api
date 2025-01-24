import { Module } from '@nestjs/common';
import { AppointmentController } from './adapters/in/api/appointment.controller';
import { InMemoryAppointmentRepository } from './adapters/out/db/in-memory-appointment.repository';
import { AppointmentService } from './core/application/appointment.service';
import { AppointmentFacade } from './core/application/ports/in/appointment.facade';

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
