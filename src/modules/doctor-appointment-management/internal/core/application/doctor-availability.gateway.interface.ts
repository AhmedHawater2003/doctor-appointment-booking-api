export abstract class IDoctorAvailabilityGateway {
  abstract releaseSlot(slotId: string): Promise<void>;
}
