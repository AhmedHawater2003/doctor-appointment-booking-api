import { Module } from '@nestjs/common';
import { AppointmentConfirmationHandler } from '../internal/application/AppointmentConfirmationHandler';
import { INotificationAPI } from 'src/modules/notification/shared/INotificationAPI';
import { EmailNotification } from 'src/modules/notification/internal/EmailNotification';
import { AppointmentConfirmationEventHandler } from '../internal/infrastructure/eventhandlers/AppointmentConfirmationEventHandler';
import { IEventBus } from 'src/shared/IEventBus';
import { EventBus } from 'src/shared/EventBus';

@Module({
  providers: [
    AppointmentConfirmationHandler,
    AppointmentConfirmationEventHandler,
    {
      provide: INotificationAPI,
      useClass: EmailNotification,
    },
    {
      provide: IEventBus,
      useClass: EventBus,
    },
  ],
})
export class AppointmentConfirmationModule {}
