export abstract class IDoctorAvailabilityAPI {
  abstract getSlotIfAvailable(id: string): Promise<any>;
  abstract listAvailableSlots(
    startTime: Date,
    endTime: Date,
    isReserved: boolean,
  ): Promise<any>;
}
