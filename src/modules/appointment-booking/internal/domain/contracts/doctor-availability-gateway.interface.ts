import { AvailableSlot } from 'src/modules/appointment-booking/internal/domain/models/available-slot.model';

export abstract class IDoctorAvailabilityGateway {
  abstract getAvailableSlots(): Promise<AvailableSlot[]>;
  abstract getSlotIfAvailable(slotId: string): Promise<AvailableSlot>;
  abstract reserveSlot(slotId: string): Promise<any>;
  abstract freeSlot(slotId: string): Promise<any>;
}
