import { Module } from '@nestjs/common';
import { DoctorAvailabilityGateway } from 'src/modules/appointment-booking/internal/adapters/gateways/doctor-availability.gateway';
import { ViewAvailableSlotsController } from 'src/modules/appointment-booking/internal/adapters/controllers/view-available-slots.controller';
import { ViewAvailableSlotsInteractor } from './internal/use-cases/queries/view-available-slots/view-available-slots.interactor';
import { IDoctorAvailabilityGateway } from './internal/domain/contracts/doctor-availability-gateway.interface';
import { BookAppointmentController } from './internal/adapters/controllers/book-appointment.controller';
import { IAppointmentBookingRepo } from './internal/domain/contracts/appointment-booking-repo.interface';
import { AppointmentBookingRepo } from './internal/infra/repos/appointment.booking.repo';
import { BookAppointmentInteractor } from './internal/use-cases/commands/book-appointment/book-appointment.interactor';
import { MemoryDatabase } from 'src/memory-database';
import { DoctorAvailabilityModule } from '../doctor-availability/doctor-availability.module';
import { IDoctorAppointmentManagementGateway } from './internal/domain/contracts/doctor-appointment-management-gateway.interface';
import { DoctorAppointmentManagementGateway } from './internal/adapters/gateways/doctor-appointment-managment.gateway';
import { DoctorAppointmentManagementModule } from '../doctor-appointment-management/doctor-appointment-management.module';
import { AppointmentPublisher } from './internal/adapters/publishers/appointment.publisher';
import { IEventBus } from 'src/shared/IEventBus';
import { EventBus } from 'src/shared/EventBus';

@Module({
  imports: [DoctorAvailabilityModule, DoctorAppointmentManagementModule],
  controllers: [ViewAvailableSlotsController, BookAppointmentController],
  providers: [
    {
      provide: IEventBus,
      useValue: EventBus,
    },
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
    AppointmentPublisher,
    MemoryDatabase,
  ],
})
export class AppointmentBookingModule {}
