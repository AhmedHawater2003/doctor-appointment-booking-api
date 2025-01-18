import { Module } from '@nestjs/common';
import { ViewAvailableSlotsController } from './view-available-slots/view-available-slots.controller';
import { BookAppointmentController } from './book-appointment/book-appointment.controller';
import { DoctorAvailabilityGateway } from './adapters/gateways/doctor-availability.gateway';
import { BookAppointmentController } from './adapters/controllers/book-appointment.controller';
import { ViewAvailableSlotsController } from './adapters/controllers/view-available-slots.controller';
import { ViewAvailableSlotsController } from './adapters/controllers/view-available-slots/view-available-slots.controller';
import { BookAppointmentController } from './book-appointment/book-appointment.controller';

@Module({
  controllers: [ViewAvailableSlotsController, BookAppointmentController],
  providers: [DoctorAvailabilityGateway]
})
export class AppointmentBookingModule {}
