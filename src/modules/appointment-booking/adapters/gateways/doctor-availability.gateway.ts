import { Injectable } from '@nestjs/common';
import { IDoctorAvailabilityGateway } from 'src/modules/appointment-booking/domain/contracts/doctor-availability-gateway.interface';
import { AvailableSlot } from 'src/modules/appointment-booking/domain/models/available-slot.model';
import { IDoctorAvailabilityAPI } from 'src/modules/doctor-availability/shared/doctor-availability.api.interface';

@Injectable()
export class DoctorAvailabilityGateway implements IDoctorAvailabilityGateway {
  constructor(private readonly doctorAvailabilityApi: IDoctorAvailabilityAPI) {}

  async getSlotIfAvailable(slotId: string): Promise<AvailableSlot> {
    const slot = await this.doctorAvailabilityApi.getSlotIfAvailable(slotId);
    if (!slot) return null;
    const dummySlot = new AvailableSlot(slot.time, slot.cost);
    return dummySlot;
  }
  async getAvailableSlots(): Promise<AvailableSlot[]> {
    return this.doctorAvailabilityApi.listAvailableSlots();
  }
}
