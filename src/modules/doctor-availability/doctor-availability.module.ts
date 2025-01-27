import { Module } from '@nestjs/common';
import { DoctorAvailabilityService } from './internal/business/services/doctor-availability.service';
import { DoctorAvailabilityController } from './internal/presentation/controllers/doctor-availability.controller';
import { IDoctorAvailabilityAPI } from './shared/doctor-availability.api.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './internal/data/entities/slot';
import { DoctorAvailabilityRepository } from './internal/data/repository/doctor.repository';
import { DoctorAvailabilityApi } from './shared/doctor-availability.api';

@Module({
  imports: [TypeOrmModule.forFeature([Slot])],
  exports: [IDoctorAvailabilityAPI],
  controllers: [DoctorAvailabilityController],
  providers: [
    DoctorAvailabilityService,
    { provide: IDoctorAvailabilityAPI, useClass: DoctorAvailabilityApi },
    DoctorAvailabilityRepository,
  ],
})
export class DoctorAvailabilityModule {}
