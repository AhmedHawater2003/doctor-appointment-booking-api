import { Injectable } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
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

  async findById(id: string): Promise<Slot | null> {
    return this.slotRepository.findOne({ where: { id } });
  }

  async findByDoctorAndTime(
    doctorId: string,
    time: Date,
  ): Promise<Slot | null> {
    return this.slotRepository.findOne({
      where: { doctorId, time },
    });
  }

  async findAvailableSlots(): Promise<Slot[]> {
    return this.slotRepository.find({
      where: {
        isReserved: false,
        time: MoreThan(new Date()),
      },
    });
  }

  async updateSlot(slotId: string, updateFields: Partial<Slot>): Promise<void> {
    await this.slotRepository.update(slotId, updateFields);
  }

  async saveSlot(slot: Slot): Promise<Slot> {
    return this.slotRepository.save(slot);
  }
}
