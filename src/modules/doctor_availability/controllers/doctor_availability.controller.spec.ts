import { Test, TestingModule } from '@nestjs/testing';
import { DoctorAvailabilityController } from './doctor_availability.controller';

describe('DoctorAvailabilityController', () => {
  let controller: DoctorAvailabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorAvailabilityController],
    }).compile();

    controller = module.get<DoctorAvailabilityController>(DoctorAvailabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
