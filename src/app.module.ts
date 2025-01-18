import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppointmentConfirmationModule } from './modules/appointment-confirmation/shared/appointment-confirmation.module';
import { DoctorAppointmentManagementModule } from './modules/doctor-appointment-management/doctor-appointment-management.module';
import { AppointmentBookingModule } from './appointment-booking/appointment-booking.module';
import { DoctorAvailabilityModule } from './modules/doctor-availability/doctor-availability.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    EventEmitterModule.forRoot(), 
    AppointmentConfirmationModule,
    DoctorAppointmentManagementModule,
    AppointmentBookingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('database.synchronize'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    DoctorAvailabilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
