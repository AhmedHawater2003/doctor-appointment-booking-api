import { IDoctorAvailabilityGateway } from 'src/appointment-booking/domain/contracts/doctor-availability-gateway.interface';
import { ViewAvailableSlotsInput } from './view-available-slots.input';
import { AvailableSlot } from 'src/appointment-booking/domain/models/available-slot.model';

export class ViewAvailableSlotsInteractor {
  constructor(private doctorAvailabilityGateway: IDoctorAvailabilityGateway) {}

  async execute(input: ViewAvailableSlotsInput): Promise<AvailableSlot[]> {
    const availableSlots =
      await this.doctorAvailabilityGateway.getAvailableSlotsStartingFrom(
        input.date,
      );
    return availableSlots;
  }
}
