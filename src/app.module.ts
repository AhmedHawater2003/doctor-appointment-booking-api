import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorAvailabilityModule } from './modules/doctor_availability/doctor_availability.module';

@Module({
  imports: [DoctorAvailabilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
