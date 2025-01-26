import { Module } from '@nestjs/common';
import { DoctorAvailabilityGateway } from 'src/modules/appointment-booking/adapters/gateways/doctor-availability.gateway';
import { ViewAvailableSlotsController } from 'src/modules/appointment-booking/adapters/controllers/view-available-slots.controller';
import { ViewAvailableSlotsInteractor } from './use-cases/queries/view-available-slots/view-available-slots.interactor';
import { IDoctorAvailabilityGateway } from './domain/contracts/doctor-availability-gateway.interface';
import { BookAppointmentController } from './adapters/controllers/book-appointment.controller';
import { IAppointmentBookingRepo } from './domain/contracts/appointment-booking-repo.interface';
import { AppointmentBookingRepo } from './infra/repos/appointment.booking.repo';
import { BookAppointmentInteractor } from './use-cases/commands/book-appointment/book-appointment.interactor';
import { MemoryDatabase } from 'src/memory-database';
import { DoctorAvailabilityModule } from '../doctor-availability/doctor-availability.module';
import { IDoctorAppointmentManagementGateway } from './domain/contracts/doctor-appointment-management-gateway.interface';
import { DoctorAppointmentManagementGateway } from './adapters/gateways/doctor-appointment-managment.gateway';
import { DoctorAppointmentManagementModule } from '../doctor-appointment-management/doctor-appointment-management.module';

@Module({
  imports: [DoctorAvailabilityModule, DoctorAppointmentManagementModule],
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
    {
      provide: IDoctorAppointmentManagementGateway,
      useClass: DoctorAppointmentManagementGateway,
    },
    ViewAvailableSlotsInteractor,
    BookAppointmentInteractor,
    MemoryDatabase,
  ],
})
export class AppointmentBookingModule {}
