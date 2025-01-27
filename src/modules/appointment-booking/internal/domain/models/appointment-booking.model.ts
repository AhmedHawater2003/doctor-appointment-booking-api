import { AppointmentBooked } from "./AppointmentBooked";
import { IAppointmentEvent } from "./IAppointmentEvent";

export class AppointmentBooking {
  private occuredEvents: IAppointmentEvent[] = [];

  constructor(
    private id: string,
    private slotId: string,
    private patientId: string,
    private patientName: string,
    private reservedAt: Date,
  ) { }

  public static newAppointment(id: string, slotId: string, patientId: string, patientName: string, reservedAt: Date, slotTime: Date, doctorName: string): AppointmentBooking {
    var appointment: AppointmentBooking = new AppointmentBooking(id, slotId, patientId, patientName, reservedAt);
    appointment.occuredEvents.push(AppointmentBooked.of(appointment, slotTime, doctorName));
    return appointment;
  }

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

  public getOccuredEvents(): IAppointmentEvent[] {
    var events: IAppointmentEvent[] = this.occuredEvents;
    this.occuredEvents = [];
    return events
  }

}
