import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorAppointmentManagementModule } from './modules/doctor-appointment-management/doctor-appointment-management.module';

@Module({
  imports: [DoctorAppointmentManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
