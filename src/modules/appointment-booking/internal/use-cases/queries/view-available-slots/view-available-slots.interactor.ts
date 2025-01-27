import { IDoctorAvailabilityGateway } from 'src/modules/appointment-booking/internal/domain/contracts/doctor-availability-gateway.interface';
import { AvailableSlot } from 'src/modules/appointment-booking/internal/domain/models/available-slot.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ViewAvailableSlotsInteractor {
  constructor(private doctorAvailabilityGateway: IDoctorAvailabilityGateway) {}

  async execute(): Promise<AvailableSlot[]> {
    const availableSlots =
      await this.doctorAvailabilityGateway.getAvailableSlots();
    return availableSlots;
  }
}
