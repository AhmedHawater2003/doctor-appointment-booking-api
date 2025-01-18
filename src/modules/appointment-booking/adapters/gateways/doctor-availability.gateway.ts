import { Injectable } from '@nestjs/common';
import { IDoctorAvailabilityGateway } from 'src/modules/appointment-booking/domain/contracts/doctor-availability-gateway.interface';
import { AvailableSlot } from 'src/modules/appointment-booking/domain/models/available-slot.model';

@Injectable()
export class DoctorAvailabilityGateway implements IDoctorAvailabilityGateway {
  async getSlot(slotId: string): Promise<AvailableSlot> {
    const dummySlot = new AvailableSlot(new Date(), 20, false);
    return dummySlot; // TODO: implementation goes here
  }
  async getAvailableSlotsStartingFrom(date: Date): Promise<AvailableSlot[]> {
    return []; // TODO: implementation goes here
  }
}
