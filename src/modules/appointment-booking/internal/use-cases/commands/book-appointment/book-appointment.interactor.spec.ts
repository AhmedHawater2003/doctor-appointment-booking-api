import { Test, TestingModule } from '@nestjs/testing';
import { BookAppointmentInput } from './book-appointment.input';
import { BookAppointmentInteractor } from './book-appointment.interactor';
import { IAppointmentBookingRepo } from 'src/modules/appointment-booking/internal/domain/contracts/appointment-booking-repo.interface';
import { IDoctorAvailabilityGateway } from 'src/modules/appointment-booking/internal/domain/contracts/doctor-availability-gateway.interface';
import { IDoctorAppointmentManagementGateway } from 'src/modules/appointment-booking/internal/domain/contracts/doctor-appointment-management-gateway.interface';
import { SlotNotAvailableException } from 'src/modules/appointment-booking/internal/domain/exceptions/slot-not-available.exception';
import { AvailableSlot } from 'src/modules/appointment-booking/internal/domain/models/available-slot.model';
import { AppointmentBooking } from 'src/modules/appointment-booking/internal/domain/models/appointment-booking.model';

describe('BookAppointmentInteractor', () => {
  let interactor: BookAppointmentInteractor;
  let appointmentBookingRepo: jest.Mocked<IAppointmentBookingRepo>;
  let doctorAvailabilityGateway: jest.Mocked<IDoctorAvailabilityGateway>;
  let doctorAppointmentManagementGateway: jest.Mocked<IDoctorAppointmentManagementGateway>;

  beforeEach(async () => {
    const mockAppointmentBookingRepo = {
      save: jest.fn(),
      getAll: jest.fn(),
    };

    const mockDoctorAvailabilityGateway = {
      getSlotIfAvailable: jest.fn(),
      reserveSlot: jest.fn(),
    };

    const mockDoctorAppointmentManagementGateway = {
      createAppointment: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookAppointmentInteractor,
        {
          provide: IAppointmentBookingRepo,
          useValue: mockAppointmentBookingRepo,
        },
        {
          provide: IDoctorAvailabilityGateway,
          useValue: mockDoctorAvailabilityGateway,
        },
        {
          provide: IDoctorAppointmentManagementGateway,
          useValue: mockDoctorAppointmentManagementGateway,
        },
      ],
    }).compile();

    interactor = module.get<BookAppointmentInteractor>(
      BookAppointmentInteractor,
    );
    appointmentBookingRepo = module.get(IAppointmentBookingRepo);
    doctorAvailabilityGateway = module.get(IDoctorAvailabilityGateway);
    doctorAppointmentManagementGateway = module.get(
      IDoctorAppointmentManagementGateway,
    );
  });

  it('should be defined', () => {
    expect(interactor).toBeDefined();
  });

  describe('execute', () => {
    it('should successfully book an appointment when slot is available', async () => {
      // Arrange
      const slotTime = new Date();
      const mockAvailableSlot = {
        getTime: () => slotTime,
      } as AvailableSlot;

      const input = new BookAppointmentInput(
        'slot-123',
        'patient-123',
        'John Doe',
      );

      const mockSavedAppointment = {} as AppointmentBooking;

      doctorAvailabilityGateway.getSlotIfAvailable.mockResolvedValue(
        mockAvailableSlot,
      );
      doctorAvailabilityGateway.reserveSlot.mockResolvedValue(undefined);
      appointmentBookingRepo.save.mockResolvedValue(mockSavedAppointment);
      doctorAppointmentManagementGateway.createAppointment.mockResolvedValue(
        undefined,
      );

      // Act
      const result = await interactor.execute(input);

      // Assert
      expect(result).toBe(mockSavedAppointment);
      expect(doctorAvailabilityGateway.getSlotIfAvailable).toHaveBeenCalledWith(
        input.slotId,
      );
      expect(doctorAvailabilityGateway.reserveSlot).toHaveBeenCalledWith(
        input.slotId,
      );
      expect(appointmentBookingRepo.save).toHaveBeenCalled();
      expect(
        doctorAppointmentManagementGateway.createAppointment,
      ).toHaveBeenCalled();
    });

    it('should throw SlotNotAvailableException when slot is not available', async () => {
      // Arrange
      const input = new BookAppointmentInput(
        'slot-123',
        'patient-123',
        'John Doe',
      );

      doctorAvailabilityGateway.getSlotIfAvailable.mockResolvedValue(null);

      // Act & Assert
      await expect(interactor.execute(input)).rejects.toThrow(
        SlotNotAvailableException,
      );
      expect(doctorAvailabilityGateway.reserveSlot).not.toHaveBeenCalled();
      expect(appointmentBookingRepo.save).not.toHaveBeenCalled();
      expect(
        doctorAppointmentManagementGateway.createAppointment,
      ).not.toHaveBeenCalled();
    });
  });
});
