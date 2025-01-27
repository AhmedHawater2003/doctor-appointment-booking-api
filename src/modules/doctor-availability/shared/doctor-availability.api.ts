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

  async listAvailableSlots(): Promise<Slot[]> {
    return await this.slotsRepository.findAvailableSlots();
  }

  async reserveSlot(id: string): Promise<void> {
    this.slotsRepository.updateSlot(id, {
      isReserved: true,
    });
  }

  async freeSlot(id: string): Promise<void> {
    this.slotsRepository.updateSlot(id, {
      isReserved: false,
    });
  }

  private isSlotAvailable(slot: Slot): boolean {
    return !slot.isReserved && slot.time >= new Date();
  }
}
