export abstract class IDoctorAvailabilityAPI {
  abstract getSlotIfAvailable(id: string): Promise<any>;
  abstract listAvailableSlots(): Promise<any>;
}
