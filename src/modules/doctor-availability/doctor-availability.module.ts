import { Module } from '@nestjs/common';
import { DoctorAvailabilityService } from './business/services/doctor-availability.service';
import { DoctorAvailabilityController } from './presentation/controllers/doctor-availability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './data/entities/slot';
import { DoctorAvailabilityRepository } from './data/repository/doctor.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Slot])],
  controllers: [DoctorAvailabilityController],
  providers: [DoctorAvailabilityService, 
    DoctorAvailabilityRepository],
})
export class DoctorAvailabilityModule {}
