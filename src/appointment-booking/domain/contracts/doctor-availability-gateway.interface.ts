import { AvailableSlot } from 'src/appointment-booking/domain/models/available-slot.model';

export abstract class IDoctorAvailabilityGateway {
  abstract getAvailableSlotsStartingFrom(date: Date): Promise<AvailableSlot[]>;
  abstract getSlot(slotId: string): Promise<AvailableSlot>;
}
