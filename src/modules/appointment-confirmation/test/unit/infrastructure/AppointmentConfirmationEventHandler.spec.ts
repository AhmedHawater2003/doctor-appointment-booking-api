import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentConfirmationEventHandler } from 'src/modules/appointment-confirmation/internal/infrastructure/eventhandlers/AppointmentConfirmationEventHandler';
import { IEventBus } from 'src/Shared/IEventBus';
import { AppointmentConfirmationHandler } from 'src/modules/appointment-confirmation/internal/application/AppointmentConfirmationHandler';
import { AppointmentBookedDto } from 'src/modules/appointment-booking/shared/dtos/AppointmentBookedDto';
import { AppointmentConfirmationMapper } from 'src/modules/appointment-confirmation/internal/infrastructure/mappers/AppointmentConfirmationMapper';

describe('AppointmentConfirmationEventHandler', () => {
  let eventHandler: AppointmentConfirmationEventHandler;
  let eventBusMock: jest.Mocked<IEventBus>;
  let confirmationHandlerMock: jest.Mocked<AppointmentConfirmationHandler>;

  beforeEach(async () => {
    eventBusMock = {
      on: jest.fn(),
    } as any;

    confirmationHandlerMock = {
      handle: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentConfirmationEventHandler,
        { provide: IEventBus, useValue: eventBusMock },
        { provide: AppointmentConfirmationHandler, useValue: confirmationHandlerMock },
      ],
    }).compile();

    eventHandler = module.get<AppointmentConfirmationEventHandler>(AppointmentConfirmationEventHandler);
  });

  it('should subscribe to the AppointmentBooked event on initialization', () => {
    eventHandler.onModuleInit();
    expect(eventBusMock.on).toHaveBeenCalledWith('AppointmentBooked', expect.any(Function));
  });

  it('should handle AppointmentBooked event and call the handler', () => {
    const payload: AppointmentBookedDto = {
      patientName: 'John Doe',
      appointmentTime: new Date(),
      doctorName: 'Dr. Smith',
    };

    const mappedPayload = {
      patientName: payload.patientName,
      appointmentTime: payload.appointmentTime,
      doctorName: payload.doctorName,
    };

    jest.spyOn(AppointmentConfirmationMapper, 'toAppointmentConfirmationDetails').mockReturnValue(mappedPayload);

    eventHandler.handle(payload);

    expect(AppointmentConfirmationMapper.toAppointmentConfirmationDetails).toHaveBeenCalledWith(payload);
    expect(confirmationHandlerMock.handle).toHaveBeenCalledWith(mappedPayload);
  });
});
