import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailabilityApi } from './doctor-availability.api';
import { DoctorAvailabilityRepository } from '../internal/data/repository/doctor.repository';
import { Slot } from '../internal/data/entities/slot';

describe('DoctorAvailabilityApi', () => {
  let doctorAvailabilityApi: DoctorAvailabilityApi;
  let doctorAvailabilityRepo: jest.Mocked<DoctorAvailabilityRepository>;

  beforeEach(async () => {
    const mockDoctorAvailabilityRepository: Partial<DoctorAvailabilityRepository> =
      {
        findById: jest.fn(),
        updateSlot: jest.fn(),
      };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorAvailabilityApi,
        {
          provide: DoctorAvailabilityRepository,
          useValue: mockDoctorAvailabilityRepository,
        },
      ],
    }).compile();

    doctorAvailabilityApi = module.get(DoctorAvailabilityApi);

    doctorAvailabilityRepo = module.get(DoctorAvailabilityRepository);
  });

  it('should be defined', () => {
    expect(doctorAvailabilityApi).toBeDefined();
  });

  describe('double check slot availability', () => {
    it('should return an available slot', async () => {
      const availableSlot: Slot = {
        cost: 100,
        doctorId: '1',
        id: '1',
        doctorName: 'Dr. John Doe',
        isReserved: false,
        time: tomorrow(),
      };
      doctorAvailabilityRepo.findById.mockResolvedValueOnce(availableSlot);

      const fetechedSlot = await doctorAvailabilityApi.getSlotIfAvailable('1');
      expect(fetechedSlot).not.toBeNull();
    });

    it('should return null if slot is reserved', async () => {
      const reservedSlot: Slot = {
        cost: 100,
        doctorId: '1',
        id: '1',
        doctorName: 'Dr. John Doe',
        isReserved: true,
        time: tomorrow(),
      };
      doctorAvailabilityRepo.findById.mockResolvedValueOnce(reservedSlot);

      const fetechedSlot = await doctorAvailabilityApi.getSlotIfAvailable('1');
      expect(fetechedSlot).toBeNull();
    });

    it('should return null if slot time is in the past', async () => {
      const slotInPast: Slot = {
        cost: 100,
        doctorId: '1',
        id: '1',
        doctorName: 'Dr. John Doe',
        isReserved: false,
        time: yesterday(),
      };
      doctorAvailabilityRepo.findById.mockResolvedValueOnce(slotInPast);

      const fetechedSlot = await doctorAvailabilityApi.getSlotIfAvailable('1');
      expect(fetechedSlot).toBeNull();
    });
  });

  describe('slot reserve and release', () => {
    it('should set isReserved to true on slot reservation', async () => {
      let availableSlot: Slot = {
        cost: 100,
        doctorId: '1',
        id: '1',
        doctorName: 'Dr. John Doe',
        isReserved: false,
        time: tomorrow(),
      };

      doctorAvailabilityRepo.updateSlot.mockImplementation(
        async (id, updates: Partial<Slot>) => {
          availableSlot = { ...availableSlot, ...updates };
        },
      );
      doctorAvailabilityApi.reserveSlot('1');
      expect(availableSlot.isReserved).toBe(true);
      expect(doctorAvailabilityRepo.updateSlot).toHaveBeenCalledWith('1', {
        isReserved: true,
      });
    });

    it('should set isReserved to false on slot release', async () => {
      let reservedSlot: Slot = {
        cost: 100,
        doctorId: '1',
        id: '1',
        doctorName: 'Dr. John Doe',
        isReserved: true,
        time: tomorrow(),
      };

      doctorAvailabilityRepo.updateSlot.mockImplementation(
        async (id, updates: Partial<Slot>) => {
          reservedSlot = { ...reservedSlot, ...updates };
        },
      );
      doctorAvailabilityApi.freeSlot('1');
      expect(reservedSlot.isReserved).toBe(false);
      expect(doctorAvailabilityRepo.updateSlot).toHaveBeenCalledWith('1', {
        isReserved: false,
      });
    });
  });
});

function tomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

function yesterday() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}
