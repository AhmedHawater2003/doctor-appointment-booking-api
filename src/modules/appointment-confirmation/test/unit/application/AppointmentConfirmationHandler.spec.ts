import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentConfirmationHandler } from 'src/modules/appointment-confirmation/internal/application/AppointmentConfirmationHandler';
import { INotificationAPI } from 'src/modules/notification/shared/INotificationAPI';
import { AppointmentConfirmationDetails } from 'src/modules/appointment-confirmation/internal/application/AppointmentConfirmationDetails';

describe('AppointmentConfirmationHandler', () => {
    let confirmationHandler: AppointmentConfirmationHandler;
    let notificationApiMock: jest.Mocked<INotificationAPI>;

    beforeEach(async () => {
        notificationApiMock = {
            notify: jest.fn(),
        } as any;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppointmentConfirmationHandler,
                { provide: INotificationAPI, useValue: notificationApiMock },
            ],
        }).compile();

        confirmationHandler = module.get<AppointmentConfirmationHandler>(AppointmentConfirmationHandler);
    });

    it('should send a notification with the correct payload', () => {
        const appointmentDetails: AppointmentConfirmationDetails = {
            patientName: 'John Doe',
            appointmentTime: new Date(),
            doctorName: 'Dr. Smith',
        };

        confirmationHandler.handle(appointmentDetails);

        expect(notificationApiMock.notify).toHaveBeenCalledWith(
            {
                patientName: appointmentDetails.patientName,
                appointmentTime: appointmentDetails.appointmentTime,
                doctorName: appointmentDetails.doctorName,
            },
            'AppointmentConfirmation',
        );
    });
});
