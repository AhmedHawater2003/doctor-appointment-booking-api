export class BookAppointmentInput {
  constructor(
    public slotId: string,
    public patientId: string,
    public patientName: string,
    public reservedAt: Date,
  ) {}
}
