import { Injectable } from '@nestjs/common';
import { Slot } from '../internal/data/entities/slot';
import { DoctorAvailabilityRepository } from '../internal/data/repository/doctor.repository';
import { IDoctorAvailabilityAPI } from './doctor-availability.api.interface';

@Injectable()
export class DoctorAvailabilityApi implements IDoctorAvailabilityAPI {
  constructor(private readonly slotsRepository: DoctorAvailabilityRepository) {}

  async getSlotIfAvailable(id: string): Promise<Slot> {
    const slot = await this.slotsRepository.findById(id);
    return this.isSlotAvailable(slot) ? slot : null;
  }

  async listAvailableSlots(
    startTime: Date,
    endTime: Date,
    isReserved: boolean,
  ): Promise<Slot[]> {
    return await this.slotsRepository.findAvailableSlots(
      isReserved,
      startTime,
      endTime,
    );
  }

  private isSlotAvailable(slot: Slot): boolean {
    return !slot.isReserved && slot.time >= new Date();
  }
}
