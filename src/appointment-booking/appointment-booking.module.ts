import { Module } from '@nestjs/common';
import { DoctorAvailabilityGateway } from 'src/appointment-booking/adapters/gateways/doctor-availability.gateway';
import { ViewAvailableSlotsController } from 'src/appointment-booking/adapters/controllers/view-available-slots.controller';
import { ViewAvailableSlotsInteractor } from './use-cases/queries/view-available-slots/view-available-slots.interactor';
import { IDoctorAvailabilityGateway } from './domain/contracts/doctor-availability-gateway.interface';
import { BookAppointmentController } from './adapters/controllers/book-appointment.controller';
import { IAppointmentBookingRepo } from './domain/contracts/appointment-booking-repo.interface';
import { AppointmentBookingRepo } from './infra/repos/appointment.booking.repo';
import { BookAppointmentInteractor } from './use-cases/commands/book-appointment/book-appointment.interactor';
import { MemoryDatabase } from 'src/memory-database';

@Module({
  controllers: [ViewAvailableSlotsController, BookAppointmentController],
  providers: [
    {
      provide: IDoctorAvailabilityGateway,
      useClass: DoctorAvailabilityGateway,
    },
    {
      provide: IAppointmentBookingRepo,
      useClass: AppointmentBookingRepo,
    },
    ViewAvailableSlotsInteractor,
    BookAppointmentInteractor,
    MemoryDatabase,
  ],
})
export class AppointmentBookingModule {}
