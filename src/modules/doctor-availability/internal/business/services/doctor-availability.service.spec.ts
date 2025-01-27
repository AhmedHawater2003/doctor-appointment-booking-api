import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { DoctorAvailabilityRepository } from '../../data/repository/doctor.repository';
import { CreateSlotDto } from '../../data/dtos/create-slot.dto';
import { BadRequestException } from '@nestjs/common';
import { Slot } from '../../data/entities/slot';

describe('DoctorAvailabilityService', () => {
  let service: DoctorAvailabilityService;
  let repository: jest.Mocked<DoctorAvailabilityRepository>;

  const mockRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByDoctorAndTime: jest.fn(),
    saveSlot: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorAvailabilityService,
        {
          provide: DoctorAvailabilityRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DoctorAvailabilityService>(DoctorAvailabilityService);
    repository = module.get(DoctorAvailabilityRepository);
  });

  // Clear mocks after each test to not wrongly count calls of mocked functions
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addSlot', () => {
    const createSlotDto: CreateSlotDto = {
      doctorId: 'doctor123',
      doctorName: 'Dr. Smith',
      time: '2023-12-25T10:00:00Z',
      cost: 100,
      isReserved: false,
    };

    it('should successfully create a new slot', async () => {
      // Arrange
      repository.findByDoctorAndTime.mockResolvedValue(null);
      const expectedSlot = new Slot();
      Object.assign(expectedSlot, {
        ...createSlotDto,
        time: new Date(createSlotDto.time),
      });
      repository.saveSlot.mockResolvedValue(expectedSlot);

      // Act
      const result = await service.addSlot(createSlotDto);

      // Assert
      expect(repository.findByDoctorAndTime).toHaveBeenCalledWith(
        createSlotDto.doctorId,
        new Date(createSlotDto.time),
      );
      expect(repository.saveSlot).toHaveBeenCalled();
      expect(result).toEqual(expectedSlot);
    });

    it('should throw BadRequestException when slot already exists', async () => {
      // Arrange
      const existingSlot = new Slot();
      repository.findByDoctorAndTime.mockResolvedValue(existingSlot);

      // Act & Assert
      await expect(service.addSlot(createSlotDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(repository.saveSlot).not.toHaveBeenCalled();
    });
  });
});
