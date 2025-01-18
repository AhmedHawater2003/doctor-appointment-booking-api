import { Injectable } from '@nestjs/common';
import { IDoctorAvailabilityGateway } from 'src/appointment-booking/domain/contracts/doctor-availability-gateway.interface';
import { AvailableSlot } from 'src/appointment-booking/domain/models/available-slot.model';

@Injectable()
export class DoctorAvailabilityGateway implements IDoctorAvailabilityGateway {
  async getSlot(slotId: string): Promise<AvailableSlot> {
    return new AvailableSlot(new Date(), 20, false); // implementation goes here
  }
  async getAvailableSlotsStartingFrom(date: Date): Promise<AvailableSlot[]> {
    return ['JOJOJO']; // implementation goes here
  }
}
