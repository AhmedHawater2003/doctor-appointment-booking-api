import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppointmentConfirmationModule } from './appointment-confirmation/appointment-confirmation.module';

@Module({
  imports: [EventEmitterModule.forRoot(), AppointmentConfirmationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
