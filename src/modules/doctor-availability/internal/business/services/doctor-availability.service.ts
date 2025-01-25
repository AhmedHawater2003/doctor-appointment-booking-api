import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSlotDto } from '../../data/dtos/create-slot.dto';
import { Slot } from '../../data/entities/slot';
import { DoctorAvailabilityRepository } from '../../data/repository/doctor.repository';

@Injectable()
export class DoctorAvailabilityService {
  constructor(private readonly repository: DoctorAvailabilityRepository) {}

  /**
   * Returns all slots (both reserved and unreserved).
   */
  async listSlots(): Promise<Slot[]> {
    return this.repository.findAll();
  }

  async getSlot(id: string): Promise<Slot> {
    return this.repository.findById(id);
  }

  /**
   * Creates a new slot for a given doctor/time if it doesn't already exist.
   */
  async addSlot(createSlotDto: CreateSlotDto): Promise<Slot> {
    // Convert the string date to an actual Date object
    const slotTime = new Date(createSlotDto.time);

    // Check if (doctorId, time) is already used
    const existingSlot = await this.repository.findByDoctorAndTime(
      createSlotDto.doctorId,
      slotTime,
    );

    if (existingSlot) {
      throw new BadRequestException(
        'A slot for this doctor and time already exists.',
      );
    }

    const slot = new Slot();
    slot.time = slotTime;
    slot.doctorId = createSlotDto.doctorId;
    slot.doctorName = createSlotDto.doctorName;
    slot.cost = createSlotDto.cost; // validated by class-validator
    slot.isReserved = createSlotDto.isReserved ?? false; // default to false if not provided

    return this.repository.saveSlot(slot);
  }
}
