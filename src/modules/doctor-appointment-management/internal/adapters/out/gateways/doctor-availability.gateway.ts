import { Injectable } from '@nestjs/common';
import { IDoctorAvailabilityGateway } from 'src/modules/doctor-appointment-management/internal/core/application/doctor-availability.gateway.interface';
import { IDoctorAvailabilityAPI } from 'src/modules/doctor-availability/shared/doctor-availability.api.interface';

@Injectable()
export class DoctorAvailabilityGateway implements IDoctorAvailabilityGateway {
  constructor(private readonly doctorAvailabilityApi: IDoctorAvailabilityAPI) {}
  async releaseSlot(slotId: string) {
    await this.doctorAvailabilityApi.freeSlot(slotId);
  }
}
