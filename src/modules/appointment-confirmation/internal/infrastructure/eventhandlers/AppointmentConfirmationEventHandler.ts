import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AppointmentBookedDto } from 'src/modules/appointment-booking/shared/dtos/AppointmentBookedDto';
import { IEventBus } from 'src/shared/IEventBus';
import { AppointmentConfirmationHandler } from '../../application/AppointmentConfirmationHandler';
import { AppointmentConfirmationMapper } from '../mappers/AppointmentConfirmationMapper';

@Injectable()
export class AppointmentConfirmationEventHandler implements OnModuleInit {
  constructor(
    @Inject(IEventBus) private readonly eventBus: IEventBus,
    private readonly appointmentConfirmationHandler: AppointmentConfirmationHandler,
  ) {}

  private subscribe(): void {
    this.eventBus.on('AppointmentBooked', this.handle.bind(this));
  }

  onModuleInit() {
    this.subscribe();
  }

  public handle(payload: AppointmentBookedDto): void {
    console.log(
      'AppointmentConfirmationEventHandler: AppointmentBooked event received',
    );
    this.appointmentConfirmationHandler.handle(
      AppointmentConfirmationMapper.toAppointmentConfirmationDetails(payload),
    );
  }
}
