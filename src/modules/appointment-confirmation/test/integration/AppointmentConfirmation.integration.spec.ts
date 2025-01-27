import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentConfirmationEventHandler } from '../../internal/infrastructure/eventhandlers/AppointmentConfirmationEventHandler';
import { AppointmentConfirmationHandler } from '../../internal/application/AppointmentConfirmationHandler';
import { AppointmentBookedDto } from 'src/modules/appointment-booking/shared/dtos/AppointmentBookedDto';
import { AppointmentConfirmationMapper } from '../../internal/infrastructure/mappers/AppointmentConfirmationMapper';
import { INotificationAPI } from 'src/modules/notification/shared/INotificationAPI';
import { IEventBus } from 'src/Shared/IEventBus';
import { EventBus } from 'src/shared/EventBus';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('AppointmentConfirmation (Integration)', () => {
    let eventHandler: AppointmentConfirmationEventHandler;
    let eventBus: IEventBus;
    let confirmationHandler: AppointmentConfirmationHandler;
    let notificationApi: INotificationAPI;

    const data = {
        patientName: 'John Doe',
        appointmentTime: new Date(),
        doctorName: 'Dr. Smith',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [EventEmitterModule.forRoot()],
            providers: [
                AppointmentConfirmationEventHandler,
                AppointmentConfirmationHandler,
                {
                    provide: IEventBus,
                    useClass: EventBus,
                },
                {
                    provide: INotificationAPI,
                    useValue: {
                        notify: jest.fn(),
                    },
                },
            ],
        }).compile();

        eventHandler = module.get<AppointmentConfirmationEventHandler>(AppointmentConfirmationEventHandler);
        eventBus = module.get<IEventBus>(IEventBus);
        confirmationHandler = module.get<AppointmentConfirmationHandler>(AppointmentConfirmationHandler);
        notificationApi = module.get<INotificationAPI>(INotificationAPI);

        jest.spyOn(AppointmentConfirmationMapper, 'toAppointmentConfirmationDetails').mockReturnValue(data);
    });

    it('should handle AppointmentBooked event and send notification', async () => {
        eventHandler.onModuleInit();

        const payload: AppointmentBookedDto = data;

        const mappedPayload = {
            patientName: payload.patientName,
            appointmentTime: payload.appointmentTime,
            doctorName: payload.doctorName,
        };

        const handleSpy = jest.spyOn(confirmationHandler, 'handle');

        eventBus.emit('AppointmentBooked', payload);

        expect(handleSpy).toHaveBeenCalledWith(mappedPayload);

        expect(notificationApi.notify).toHaveBeenCalledWith(
            {
                patientName: mappedPayload.patientName,
                appointmentTime: mappedPayload.appointmentTime,
                doctorName: mappedPayload.doctorName,
            },
            'AppointmentConfirmation',
        );
    });
});
