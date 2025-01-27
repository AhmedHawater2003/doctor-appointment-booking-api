import { Slot } from '../internal/data/entities/slot';

export abstract class IDoctorAvailabilityAPI {
  abstract getSlotIfAvailable(id: string): Promise<Slot>;
  abstract listAvailableSlots(): Promise<Slot[]>;
  abstract reserveSlot(id: string): Promise<void>;
  abstract freeSlot(id: string): Promise<void>;
}
