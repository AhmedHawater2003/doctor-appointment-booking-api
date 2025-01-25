import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot } from '../entities/slot';

@Injectable()
export class DoctorAvailabilityRepository {
  constructor(
    @InjectRepository(Slot)
    private readonly slotRepository: Repository<Slot>,
  ) {}

  async findAll(): Promise<Slot[]> {
    return this.slotRepository.find();
  }

  async findById(id: string): Promise<Slot | undefined> {
    return this.slotRepository.findOne({ where: { id } });
  }

  async findByDoctorAndTime(doctorId: string): Promise<Slot | null> {
    return this.slotRepository.findOne({
      where: { doctorId },
    });
  }

  async findAvailableSlots(
    isReserved: boolean,
    startTime: Date,
    endTime: Date,
  ): Promise<Slot[]> {
    return this.slotRepository.find({
      where: { isReserved, time: { $gte: startTime, $lte: endTime } },
    });
  }
  async saveSlot(slot: Slot): Promise<Slot> {
    return this.slotRepository.save(slot);
  }
}
