export class AppointmentBooking {
  constructor(
    private id: string,
    private slotId: string,
    private patientId: string,
    private patientName: string,
    private reservedAt: Date,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getSlotId(): string {
    return this.slotId;
  }

  public getPatientId(): string {
    return this.patientId;
  }

  public getPatientName(): string {
    return this.patientName;
  }

  public getReservationTime(): Date {
    return this.reservedAt;
  }
}
