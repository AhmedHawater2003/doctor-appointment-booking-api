import { Injectable } from '@nestjs/common';
import { IDoctorAvailabilityGateway } from 'src/modules/appointment-booking/internal/domain/contracts/doctor-availability-gateway.interface';
import { AvailableSlot } from 'src/modules/appointment-booking/internal/domain/models/available-slot.model';
import { IDoctorAvailabilityAPI } from 'src/modules/doctor-availability/shared/doctor-availability.api.interface';

@Injectable()
export class DoctorAvailabilityGateway implements IDoctorAvailabilityGateway {
  constructor(private readonly doctorAvailabilityApi: IDoctorAvailabilityAPI) {}

  async getSlotIfAvailable(slotId: string) {
    const slot = await this.doctorAvailabilityApi.getSlotIfAvailable(slotId);
    if (!slot) return null;
    const dummySlot = new AvailableSlot(slot.time, slot.cost);
    return dummySlot;
  }

  async getAvailableSlots() {
    const availableSlots =
      await this.doctorAvailabilityApi.listAvailableSlots();
    return availableSlots.map(
      (slot) => new AvailableSlot(slot.time, slot.cost),
    );
  }

  async reserveSlot(slotId: string) {
    this.doctorAvailabilityApi.reserveSlot(slotId);
  }

  async freeSlot(slotId: string) {
    this.doctorAvailabilityApi.freeSlot(slotId);
  }
}
