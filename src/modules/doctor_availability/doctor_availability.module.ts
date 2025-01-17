import { Module } from '@nestjs/common';
import { DoctorAvailabilityService } from './services/doctor_availability.service';
import { DoctorAvailabilityController } from './controllers/doctor_availability.controller';

@Module({
  controllers: [ DoctorAvailabilityController],
  providers: [DoctorAvailabilityService]
})
export class DoctorAvailabilityModule {}
